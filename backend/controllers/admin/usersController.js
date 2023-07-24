import { mongoose_model as User } from "../../model/userModel.js";
import bcrypt from "bcryptjs";
import { uploadFile } from '../../utils/helpers.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $not: { $eq: "admin" } } }).select('-password');
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
export const addUser = async (req, res) => {
  const { firstName, secondName, email, password, imageData, imageName } = req.body;

  let filename;
  // File upload
  if(imageData && imageName) {
    filename = uploadFile(imageData, imageName, 'users');
  }

  if(firstName && secondName && email && password) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = await User.create({
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
export const deleteUser = async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id});
  if(!user) {
    return res.status(401).json({
      message: "No user found"
    });
  }
  return res.status(200).json({ 
    message: "User deleted successfully",
  });
}

  
