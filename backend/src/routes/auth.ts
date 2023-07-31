import express, { Express, Request, Response } from 'express';
import { loginUser, registerUser } from "../controllers/authController.js";
import { protectAdminRoute } from "../middleware/authMiddleware.js";
import { Req } from '../types/types.js';

const router : express.Router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/logout', (req : Request, res : Response) => {
  res.cookie("accessToken", "", {});
  return res.redirect("http://localhost:3000");
});

router.get('/admin_user', protectAdminRoute, (req : Req, res : Response) => {
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