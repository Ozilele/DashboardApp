import { CookieOptions, Request, Response } from 'express';
import bcrypt from "bcryptjs";
import { signJWT } from "../config/jwt.js";
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
  const { email, password } = req.body;
  // Check for email
  const user : HydratedDocument<User> = await UserModel.findOne({ email }).lean();

  if(!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }
  // Compare passwords
  const arePasswordMatched : boolean = bcrypt.compareSync(password, user.password);
  const userPayload : UserToken = {
    userId: (user._id).toString(),
    email: user.email
  }
  if(user && arePasswordMatched) {
    const accessToken : string = signJWT(userPayload, {
      expiresIn: 900000,
    });
    const accessTokenCookieOptions : CookieOptions = { 
      maxAge: 90000000,
      domain: "localhost",
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    }
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials"
    });
  }
};

