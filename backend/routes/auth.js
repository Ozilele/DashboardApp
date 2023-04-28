import express from 'express';
import { mongoose_model as User } from "../model/userModel.js";
import { getUserData, loginUser, registerUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, getUserData);

export default router;