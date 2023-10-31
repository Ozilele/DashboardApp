import { Request, Response } from 'express';
import { signJWT } from "../config/jwt.js";
import { mongoose_model as UserModel } from "../model/userModel.js";
import { User, UserToken } from "../types/types.js";
import jwt from "jsonwebtoken";
import { HydratedDocument } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const handleRefreshToken = async (req: Request, res : Response) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;

  const foundUser: HydratedDocument<User> = await UserModel.findOne({ refreshToken }).lean();
  if(!foundUser) return res.sendStatus(403); // Forbidden

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: Error, decoded: UserToken) => {
      if(err || foundUser._id.toString() !== decoded.userId.toString()) return res.sendStatus(403);
      const userPayload: UserToken = {
        userId: (decoded.userId).toString(),
        email: decoded.email
      }
      const accessToken: string = signJWT(userPayload, {
        expiresIn: '600s'
      });
      console.log("Access Token z Refresh Controller to", accessToken);
      res.json({ accessToken, role: foundUser?.role, id: decoded.userId.toString() });
    }
  );
};

