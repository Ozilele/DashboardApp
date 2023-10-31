import { CookieOptions, Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { signJWT, signRefreshToken } from "../config/jwt.js";
import { mongoose_model as UserModel } from "../model/userModel.js";
import { User, UserToken } from "../types/types.js";
import { HydratedDocument } from 'mongoose';

// @desc Register new user
// @route POST /auth/
// @access PUBLIC
export const registerUser = async (req : Request, res : Response) => {
  const { firstName, secondName, email, password, role }  = req.body;

  if(!firstName || !email || !password || !secondName) {
    res.status(400).json({
      message: "Please add all the fields",
    });
  }
  // Checking if user exists
  const userExists : HydratedDocument<User> = await UserModel.findOne({ email });
  if(userExists) {
    res.status(400).json({
      message: "User of this email already exists"
    });
  } 
  const salt : string = bcrypt.genSaltSync(10);
  const hashPassword : string = bcrypt.hashSync(password, salt);
  // Create a User
  const user : HydratedDocument<User> = await UserModel.create({
    firstName,
    secondName,
    email,
    password: hashPassword,
    role,
  });

  if(user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400).json({
      message: "Invalid user data"
    });
  }
};

// @desc Authenticate a user
// @route POST /auth/login
// @access PUBLIC
export const loginUser = async (req: Request, res : Response) => {
  const cookies = req.cookies;
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ message: "Email and password are required" });
  const user : HydratedDocument<User> = await UserModel.findOne({ email });

  if(!user) { 
    return res.status(401).json({
      message: "User does not exist"
    });
  }
  // Compare passwords
  const arePasswordMatched : boolean = bcrypt.compareSync(password, user.password);
  const userPayload : UserToken = {
    userId: (user._id).toString(),
    email: user.email
  }
  if(arePasswordMatched) {
    const accessToken : string = signJWT(userPayload, {
      expiresIn: '60s',
    });
    const accessTokenCookieOptions : CookieOptions = { 
      maxAge: 90000000,
      domain: "localhost",
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    }
    const newRefreshToken = signRefreshToken(userPayload, {
      expiresIn: "1d"
    });
    // let newRefreshTokenArray = !cookies?.jwt ? user.refreshToken : user.refreshToken.filter(rt => rt !== cookies.jwt);
    // if(cookies?.jwt) {
    //   /* 
    //     Scenario added here: 
    //     1) User logs in but never uses RT and does not logout 
    //     2) RT is stolen
    //     3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    //   */
    //   const refreshToken = cookies.jwt;
    //   const foundToken = await UserModel.findOne({ refreshToken }).exec();
    //   if(!foundToken) { 
    //     newRefreshTokenArray = [];
    //   }
    //   res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
    // }
    user.refreshToken = [newRefreshToken];
    console.log("RefreshToken of a user is ", user.refreshToken);
    const result = await user.save();
    // res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    // HttpOnly Cookie is not available for JS, it' much more secure to store it than in LocalStorage, avoiding possibility of Cross-Site-Scripting(XSS) 
    res.cookie("jwt", newRefreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000, }); 
    res.status(200).json({ 
      accessToken,
      role: user.role, 
    });
  } else {
    res.sendStatus(401);
  }
};

// @desc Logout a user
// @route GET /auth/logout
// @access PRIVATE(admin or logged in user)
export const logoutUser = async (req: Request, res : Response) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;
  // Is refreshToken in db? 
  const foundUser : HydratedDocument<User> = await UserModel.findOne({ refreshToken });
  if(!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(204); // No content
  }
  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
  // foundUser.refreshToken = null;
  const result = await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: 'none', secure: true }); // secure = true in production
  res.sendStatus(204);
};

