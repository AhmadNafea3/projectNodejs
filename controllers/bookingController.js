import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { eventId, seats } = req.body;

    const booking = await Booking.create({
      userId: req.user._id,
      eventId,
      seats,
      status: "confirmed",
    });

    res.status(201).json({
      success: true,
      message: "Booking confirmed",
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "canceled";
    await booking.save();

    res.json({ success: true, message: "Booking canceled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const joinWaitlist = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "waitlist";
    await booking.save();

    res.json({ success: true, message: "Added to waitlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
