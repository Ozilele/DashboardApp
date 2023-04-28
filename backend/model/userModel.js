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
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"]
    },
    role: String,
  },
);

export const mongoose_model = mongoose.model('User', userSchema);