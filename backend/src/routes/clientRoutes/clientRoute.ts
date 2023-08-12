import express from "express";
import { getHotels } from "../../controllers/admin/hotelsController.js";
import { getHotel } from "../../controllers/client/hotelController.js";
import { getReviews, postReview } from "../../controllers/client/reviewController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router : express.Router = express.Router();

router.get("/hotels", getHotels);
router.get("/hotel/:id", getHotel);
router.get("/reviews", getReviews);
router.post("/reviews", protect, postReview); // protected route - User must be logged in to add a review

export default router;