import express from 'express';
import { protectAdminRoute } from '../middleware/authMiddleware.js';
import { getUsers, getUser, addUser, deleteUser, updateUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/home', protectAdminRoute, (req, res) => {
  return res.status(200).json({ message: "Tutaj dashboard!" });
});

router.get('/hotels', protectAdminRoute, (req, res) => {
  return res.status(200).json({ message: "Tutaj hotels!" });
});

router.post('/hotels', protectAdminRoute, (req, res) => {
  return res.status(200).json({ message: "Hotel added" });
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

router.route('/users').get(protectAdminRoute, getUsers).post(protectAdminRoute, addUser);
router.route('/users/:id').get(protectAdminRoute, getUser).delete(protectAdminRoute, deleteUser).put(protectAdminRoute, updateUser);

export default router;