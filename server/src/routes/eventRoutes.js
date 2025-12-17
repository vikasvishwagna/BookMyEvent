import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createEvent, getAllEvents, updateEvent, deleteEvent, rsvpEvent, unrsvpEvent,getMyEvents,
  getJoinedEvents } from "../controllers/eventController.js";


const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", getAllEvents);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);
router.post("/:id/rsvp", protect, rsvpEvent);
router.post("/:id/unrsvp", protect, unrsvpEvent);
router.get("/my-events", protect, getMyEvents);
router.get("/joined-events", protect, getJoinedEvents);


export default router;
