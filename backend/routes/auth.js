import express from 'express';
import { getUserData, loginUser, registerUser } from '../controllers/authController.js';
import { protect, protectAdminRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/logout', (req, res) => {
  res.cookie("accessToken", "", {});
  return res.redirect("http://localhost:3000");
});
router.get('/user', protect, getUserData);

router.get('/admin_user', protectAdminRoute, (req, res) => {
  if(req.user) {
    return res.status(201).json({
      message: "authorized"
    });
  }
  return res.status(401).json({
    message: "Error"
  });
});

export default router;