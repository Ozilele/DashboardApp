import express from "express";
import { getHotels } from "../../controllers/admin/hotelsController.js";

const router : express.Router = express.Router();

router.get("/hotels", getHotels);

export default router;