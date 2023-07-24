import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
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
  },
);

export const mongoose_model = mongoose.model('users', userSchema);