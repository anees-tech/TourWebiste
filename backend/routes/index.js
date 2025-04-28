const express = require("express")
const router = express.Router()

const authRoutes = require("./auth.routes")
const userRoutes = require("./user.routes")
const tourRoutes = require("./tour.routes")
const flightRoutes = require("./flight.routes")
const hotelRoutes = require("./hotel.routes")
const bookingRoutes = require("./booking.routes")

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/tours", tourRoutes)
router.use("/flights", flightRoutes)
router.use("/hotels", hotelRoutes)
router.use("/bookings", bookingRoutes)

module.exports = router
