import { Schema, model } from "mongoose";
import { User } from "../types/types.js";

const userSchema = new Schema<User>({
  firstName: {
    type: String,
    required: [true, "Please add a name"]
  },
  secondName: {
    type: String,
    required: [true, "Please add a second name"]
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"]
  },
  imageFile: {
    type: String,
  },
  role: String,
  refreshToken: [String],
});

export const mongoose_model = model<User>('users', userSchema);