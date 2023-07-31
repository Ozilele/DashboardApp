import express from "express";
import { getEventsForDate, addEventForDate, updateEvent, deleteEvent } from "../../controllers/admin/eventsController.js";
import { protectAdminRoute } from "../../middleware/authMiddleware.js";
const router : express.Router = express.Router();

// Using express query string to get the current date(admin/calendar/date?currDate=27.04.2023 etc.)
router.get("/date", protectAdminRoute, getEventsForDate);
router.post("/", protectAdminRoute, addEventForDate);
router.delete("/:id", protectAdminRoute, deleteEvent);
router.put("/:id", protectAdminRoute, updateEvent);

export default router;