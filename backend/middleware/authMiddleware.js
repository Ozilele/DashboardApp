import jwt from 'jsonwebtoken';
import { mongoose_model as User } from "../model/userModel.js";
import { verifyJWT } from '../config/jwt.js';

export const protect = async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Getting token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch(error) {
      console.log(error);
      return res.status(401).json({
        message: "Not authorized"
      });
    }
  }

  if(!token) {
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
