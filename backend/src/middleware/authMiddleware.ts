import { Response, NextFunction } from 'express';
import { mongoose_model as UserModel } from "../model/userModel.js";
import { Verification } from "../types/types.js";
import { Req, User } from '../types/types.js';
import { verifyJWT } from "../config/jwt.js";
import { HydratedDocument } from 'mongoose';

export const protect : (req: Req, res: Response, next: NextFunction) => Promise<Response> = async (req : Req, res : Response, next : NextFunction) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.sendStatus(401);
  const token : string = authHeader.replace('Bearer ', "");
  if(req.headers.authorization && req.headers.authorization?.startsWith('Bearer')) {
    try {
      // Getting token from header
      const verification : Verification = verifyJWT(token);
      // Verify the token
      if(verification.valid) {
        const userID : string = verification.decoded.userId;
        let user : HydratedDocument<User> = await UserModel.findOne({ _id: userID }).select('-password');
        req.user = user;
        if(req.user) {
          next();
        } else {
          return res.status(403).json({
            message: "Invalid token"
          });
        }
      } else {
        return res.sendStatus(403); // Forbidden - Token verification is invalid
      }
    } catch(error) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }
  } else {
    return res.status(401).json({
      message: "Not authorized"
    });
  }
}

export const protectAdminRoute : (req: Req, res: Response, next: NextFunction) => Promise<Response> = async (req : Req, res : Response, next : NextFunction) => {
  const token : string = req?.headers?.authorization?.replace('Bearer ', "");
  console.log("Token z middleware to", token);
  if(req.headers.authorization && req.headers.authorization?.startsWith('Bearer')) {
    try {
      // Verify the token
      const verification : Verification = verifyJWT(token);
      // Check for admin user
      if(verification.valid) {
        const userID : string = verification.decoded.userId;
        let user : HydratedDocument<User> = await UserModel.findOne({ _id: userID }).select('-password');
        req.user = user;
        if(req.user.role !== "admin") {
          return res.status(401).json({
            message: "Not authorized as an admin",
          });
        } else {
          next(); // User authorized as an admin
        }
      } else {
        return res.sendStatus(403); // Forbidden
      }
    } 
    catch(error) {
      return res.status(401).json({
        message: "Not authorized as an admin",
      });
    }
  } else {
    return res.status(400).json({
      message: "No authorization header included"
    });
  }
}
