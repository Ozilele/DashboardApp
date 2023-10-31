import express from 'express';
import { loginUser, registerUser, logoutUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { handleRefreshToken } from '../controllers/refreshTokenController.js';

const router : express.Router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout', protect, logoutUser);

export default router;