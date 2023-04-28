
import { mongoose_model as User } from "../model/userModel.js";
// Get Users 
// @route GET /users
export const getUsers = async (req, res) => {
  // Adding error validation
  const users = await User.find();
  return res.status(200).json(users);
}

// Get specific User
// @route GET /users/_id
export const getUser = (req, res) => {
  return res.status(200).json({ message: `Getting user of id ${req.params.id}` });
}

// Add new User
// @route POST /users/_id
export const addUser = async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  return res.status(200).json({ message: "User added" });
}

// Delete a user
// @route DELETE /users/_id
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await user.remove();
  return res.status(200).json({ id: req.params.id });
}

// Update user
// @route PUT /users/_id
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }
  user.password = req.body.password
  await user.save()
  return res.status(200).json({
    message: "Your password has been successfully changed",
  });
}