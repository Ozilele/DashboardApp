import express from 'express';
import { protectAdminRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/home', protectAdminRoute, (req, res) => {
  return res.status(200).json({ message: "Tutaj dashboard!" });
});

router.get('/bookings', protectAdminRoute, (req, res) => {
  return res.status(200).json({ message: "No co tam halo?" });
});

router.get('/calendar', protectAdminRoute, (req, res) => {
  return res.status(200).json({ message: "Siema Polsko!" });
});

router.get('/kanban', protectAdminRoute, (req, res) => {
  return res.status(200).json({ message: "Siemanko, witam w mojej kuchni!" });
});

export default router;