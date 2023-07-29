import jwt from 'jsonwebtoken';
import { mongoose_model as User } from "../model/userModel.js";
import { verifyJWT } from '../config/jwt.js';

export const protect = async (req, res, next) => {
  console.log(req?.headers?.authorization);
  const token = req?.headers?.authorization?.replace('Bearer ', "");

  if(req.headers.authorization && req.headers.authorization?.startsWith('Bearer')) {
    try {
      // Getting token from header
      const verification = verifyJWT(token);
      // Verify the token
      if(verification.valid) {
        const userID = verification.decoded.userId;
        req.user = await User.findOne({ _id: userID }).select('-password');
        if(req.user) {
          next();
        } else {
          return res.status(403).json({
            message: "Not authorized"
          });
        }
      }
    } catch(error) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }
  } else {
    res.status(401).json({
      message: "Not authorized"
    });
  }
}

export const protectAdminRoute = async (req, res, next) => {
  console.log(req?.headers?.authorization);
  const token = req?.headers?.authorization?.replace('Bearer ', "");
  if(req.headers.authorization && req.headers.authorization?.startsWith('Bearer')) {
    try {
      // Getting token from header
      // Verify the token
      const verification = verifyJWT(token);
      // Check for admin user
      if(verification.valid) {
        const userID = verification.decoded.userId;
        req.user = await User.findOne({ _id: userID }).select('-password');
        console.log(req.user.role);
        if(req.user.role !== "admin") {
          return res.status(401).json({
            message: "Not authorized as an admin",
          });
        } else {
          next(); // User authorized as an admin
        }
      }
    } 
    catch(error) {
      return res.status(401).json({
        message: "Not authorized as an admin",
      });
    }
  } else {
    return res.status(401).json({
      message: "Error getting the token"
    });
  }
}
