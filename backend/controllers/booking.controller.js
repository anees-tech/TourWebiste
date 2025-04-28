const Booking = require("../models/booking.model")

// Get all bookings
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("tourId", "title destination")
      .populate("flightId", "airline flightNumber from to")
      .populate("hotelId", "name location")

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    })
  } catch (error) {
    next(error)
  }
}

// Get user bookings
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("userId", "name email")
      .populate("tourId", "title destination")
      .populate("flightId", "airline flightNumber from to")
      .populate("hotelId", "name location")

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    })
  } catch (error) {
    next(error)
  }
}

// Get booking by ID
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "name email")
      .populate("tourId", "title destination")
      .populate("flightId", "airline flightNumber from to")
      .populate("hotelId", "name location")

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    res.status(200).json({
      success: true,
      data: booking,
    })
  } catch (error) {
    next(error)
  }
}

// Create booking
exports.createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body)

    res.status(201).json({
      success: true,
      data: booking,
    })
  } catch (error) {
    next(error)
  }
}

// Update booking
exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    res.status(200).json({
      success: true,
      data: booking,
    })
  } catch (error) {
    next(error)
  }
}

// Cancel booking
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "canceled" },
      { new: true, runValidators: true },
    )

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    res.status(200).json({
      success: true,
      data: booking,
    })
  } catch (error) {
    next(error)
  }
}
