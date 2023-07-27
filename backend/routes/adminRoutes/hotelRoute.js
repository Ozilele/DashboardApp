import express from "express";
import { getHotels, postNewHotel, deleteHotel } from "../../controllers/admin/hotelsController.js";

const router = express.Router();

router.get('/', getHotels); // protectAdminRoute
router.post("/", postNewHotel);
router.delete("/:id", deleteHotel);

export default router;

