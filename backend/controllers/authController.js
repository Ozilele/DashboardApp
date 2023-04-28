import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { mongoose_model as User } from "../model/userModel.js";
// @desc Register new user
// @route POST /auth/
// @access PUBLIC
export const registerUser = async (req, res) => {
  const { firstName, secondName, email, password, role } = req.body;

  if(!firstName || !email || !password || !secondName) {
    res.status(400).json({
      message: "Please add all the fields",
    })
    // throw new Error("Please add all the fields");
  }
  // Checking if user exists
  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400).json({
      message: "User of this email already exists"
    });
    // throw new Error("This user already exists");
  } 
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  // Create a User
  const user = await User.create({
    firstName,
    secondName,
    email,
    password: hashPassword,
    role,
  });

  if(user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid user data"
    });
    // throw new Error("Invalid user data");
  }
};

// @desc Authenticate a user
// @route POST /auth/login
// @access PUBLIC
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Check for email
  const user = await User.findOne({email});

  if(!user) {
    return res.status(400).json({
      message: "Invalid credentials"
    });
  }
  // Compare passwords
  const arePasswordMatched = await bcrypt.compareSync(password, user.password);

  if(user && arePasswordMatched) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials"
    });
    // throw new Error("Invalid credentials");
  }
};

// @desc  Get user data(Send JWT to user)
// @route GET /auth/user
// @access PRIVATE(protected route)
export const getUserData = async (req, res) => {
  const { _id, firstName, email, role } = await User.findById(req.user.id);
  res.json({
    id: _id,
    name: firstName,
    email,
    role,
  });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}
