import express from "express";
import { getEventsForDate, addEventForDate, updateEvent, deleteEvent } from "../../controllers/eventsController.js";
const router = express.Router();

// Using express query string to get the current date(admin/calendar/date?currDate=27.04.2023 etc.)
router.get("/date", getEventsForDate);
router.post("/", addEventForDate);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

export default router;
