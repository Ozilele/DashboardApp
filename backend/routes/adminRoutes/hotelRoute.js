import express from "express";
import { getHotels, postNewHotel, deleteHotel } from "../../controllers/admin/hotelsController.js";
import { protectAdminRoute } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', getHotels);
router.post("/", protectAdminRoute, postNewHotel);
router.delete("/:id", protectAdminRoute, deleteHotel);

export default router;

