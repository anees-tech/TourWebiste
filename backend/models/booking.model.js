const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["tour", "flight", "hotel"],
      required: true,
    },
    // For tour bookings
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
    // For flight bookings
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
    // For hotel bookings
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    roomType: {
      type: String,
    },
    // Common fields
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    guests: {
      adults: {
        type: Number,
        default: 1,
      },
      children: {
        type: Number,
        default: 0,
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    specialRequests: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Booking", bookingSchema)
