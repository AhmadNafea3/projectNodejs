import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
  joinWaitlist,
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getBookings);
router.get("/:id", protect, getBookingById);
router.delete("/:id", protect, cancelBooking);
router.post("/:id/waitlist", protect, joinWaitlist);

export default router;
