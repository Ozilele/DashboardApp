import jwt from 'jsonwebtoken';
import { mongoose_model as User } from "../model/userModel.js";

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
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if(!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
}

export const protectAdminRoute = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Getting token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Check for admin user
      req.user = await User.findOne(decoded.id).select('-password');
      if(req.user.role !== "admin") {
        res.status(401);
        throw new Error("Not authorized as an admin");
      } else {
        next();
      }
    } catch(error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
  }

  if(!token) {
    res.status(401);
    throw new Error("Not authorized as an admin, no token");
  }
}


// Token is sent like Bearer _token_
