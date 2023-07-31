import { mongoose_model as UserModel } from "../../model/userModel.js";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { uploadFile } from "../../utils/helpers.js";
import { User } from "../../types/types.js";

export const getUsers = async (req : Request, res : Response) => {
  try {
    const users : User[] = await UserModel.find({ role: { $not: { $eq: "admin" } } }).select('-password');
    if(users?.length > 0) {
      return res.status(201).json({
        message: "Users found",
        users,
      });
    } else if(users?.length === 0) {
      return res.status(201).json({
        message: "No users found",
      });
    } else {
      return res.status(401).json({
        message: "Error getting users data"
      });
    }
  }
  catch(err) {
    return res.status(500).json({
      message: "Network error",
    });
  }
}

// Add new User
export const addUser = async (req : Request, res : Response) => {
  const { firstName, secondName, email, password, imageData, imageName } = req.body;
  let filename : string;
  // File upload
  if(imageData && imageName) {
    filename = uploadFile(imageData, imageName, 'users');
  }

  if(firstName && secondName && email && password) {
    try {
      const salt : string = bcrypt.genSaltSync(10);
      const hashPassword : string = bcrypt.hashSync(password, salt);
      const newUser : User = await UserModel.create({
        firstName,
        secondName,
        email,
        password: hashPassword,
        imageFile: filename ? filename : null,
      });
      if(newUser) {
        return res.status(201).json({ message: "User added" });
      } else {
        return res.status(403).json({ message: "Error adding a user" });
      }
    } catch(err) {
      console.log(err);
    }
  } else {
    return res.status(403).json({
      message: "Need to add fields"
    });
  }
}

// Delete a user
export const deleteUser = async (req : Request, res : Response) => {
  const user = await UserModel.deleteOne({ _id: req.params.id});
  if(!user) {
    return res.status(401).json({
      message: "No user found"
    });
  }
  return res.status(200).json({ 
    message: "User deleted successfully",
  });
}

  
