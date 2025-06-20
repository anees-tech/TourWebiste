const Booking = require("../models/booking.model")

// Get all bookings (Admin only)
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("tourId", "title destination")
      .populate("flightId", "airline flightNumber from to")
      .populate("hotelId", "name location")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    })
  } catch (error) {
    next(error)
  }
}

// Get user bookings (Admin only)
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("userId", "name email")
      .populate("tourId", "title destination")
      .populate("flightId", "airline flightNumber from to")
      .populate("hotelId", "name location")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    })
  } catch (error) {
    next(error)
  }
}

// Get my bookings
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("tourId", "title destination image")
      .populate("flightId", "airline flightNumber from to")
      .populate("hotelId", "name location image")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    })
  } catch (error) {
    next(error)
  }
}

// Get my upcoming bookings
exports.getMyUpcomingBookings = async (req, res, next) => {
  try {
    const currentDate = new Date()
    const bookings = await Booking.find({
      userId: req.user.id,
      status: { $in: ["pending", "confirmed"] },
      $or: [
        { startDate: { $gte: currentDate } },
        { departDate: { $gte: currentDate } },
        { checkIn: { $gte: currentDate } },
      ],
    })
      .populate("tourId", "title destination image")
      .populate("flightId", "airline flightNumber from to")
      .populate("hotelId", "name location image")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    })
  } catch (error) {
    next(error)
  }
}

// Get my past bookings
exports.getMyPastBookings = async (req, res, next) => {
  try {
    const currentDate = new Date()
    const bookings = await Booking.find({
      userId: req.user.id,
      status: "completed",
      $or: [
        { endDate: { $lt: currentDate } },
        { departDate: { $lt: currentDate } },
        { checkOut: { $lt: currentDate } },
      ],
    })
      .populate("tourId", "title destination image")
      .populate("flightId", "airline flightNumber from to")
      .populate("hotelId", "name location image")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    })
  } catch (error) {
    next(error)
  }
}

// Get my canceled bookings
exports.getMyCanceledBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
      status: "canceled",
    })
      .populate("tourId", "title destination image")
      .populate("flightId", "airline flightNumber from to")
      .populate("hotelId", "name location image")
      .sort({ createdAt: -1 })

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

    // Check if user owns this booking or is admin
    if (booking.userId._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this booking",
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
    const bookingData = {
      ...req.body,
      userId: req.user.id,
    }

    const booking = await Booking.create(bookingData)

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
    let booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    // Check if user owns this booking or is admin
    if (booking.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this booking",
      })
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

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
    let booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    // Check if user owns this booking or is admin
    if (booking.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking",
      })
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, { status: "canceled" }, { new: true, runValidators: true })

    res.status(200).json({
      success: true,
      data: booking,
    })
  } catch (error) {
    next(error)
  }
}
