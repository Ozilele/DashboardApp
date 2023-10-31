import express from "express";
import { protectAdminRoute } from "../../middleware/authMiddleware.js";
import { getBookings } from "../../controllers/admin/bookingsController.js";

const router: express.Router = express.Router();

router.get("/", protectAdminRoute, getBookings);

export default router;
