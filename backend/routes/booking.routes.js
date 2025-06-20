const express = require("express")
const router = express.Router()
const bookingController = require("../controllers/booking.controller")
const { protect, admin } = require("../middleware/auth")

router.get("/", protect, admin, bookingController.getAllBookings)
router.get("/user/:userId", protect, bookingController.getUserBookings)
router.get("/my-bookings", protect, bookingController.getMyBookings)
router.get("/my-upcoming", protect, bookingController.getMyUpcomingBookings)
router.get("/my-bookings/past", protect, bookingController.getMyPastBookings)
router.get("/my-bookings/canceled", protect, bookingController.getMyCanceledBookings)
router.get("/:id", protect, bookingController.getBookingById)
router.post("/", protect, bookingController.createBooking)
router.put("/:id", protect, bookingController.updateBooking)
router.delete("/:id", protect, bookingController.cancelBooking)

module.exports = router
