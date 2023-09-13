import express from "express";
import { getHotels } from "../../controllers/admin/hotelsController.js";
import { addToFavorites, deleteFromFavorites, getFavorites, getHotel, isHotelFavorite } from "../../controllers/client/hotelController.js";
import { getReviews, postReview } from "../../controllers/client/reviewController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router : express.Router = express.Router();

router.get("/hotels", getHotels);
router.get("/hotel/:id", getHotel);
router.get("/reviews", getReviews);
// protected route - User must be logged in to add a review
router.post("/reviews", protect, postReview); 
// protected route - User must be logged in to get favorite hotels
router.get("/favorites", protect, getFavorites);
// protected route - User must be logged in to check if this hotel is already in it's favorite list
router.get("/favorite", protect, isHotelFavorite);
router.post("/favorite", protect, addToFavorites);
router.delete("/favorite/:hotelId", protect, deleteFromFavorites);


export default router;