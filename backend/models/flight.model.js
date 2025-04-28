const mongoose = require("mongoose")

const flightSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      required: [true, "Please provide an airline name"],
    },
    flightNumber: {
      type: String,
      required: [true, "Please provide a flight number"],
    },
    from: {
      type: String,
      required: [true, "Please provide departure location"],
    },
    to: {
      type: String,
      required: [true, "Please provide arrival location"],
    },
    departDate: {
      type: Date,
      required: [true, "Please provide departure date"],
    },
    departTime: {
      type: String,
      required: [true, "Please provide departure time"],
    },
    arriveDate: {
      type: Date,
      required: [true, "Please provide arrival date"],
    },
    arriveTime: {
      type: String,
      required: [true, "Please provide arrival time"],
    },
    duration: {
      type: String,
      required: [true, "Please provide flight duration"],
    },
    price: {
      type: Number,
      required: [true, "Please provide flight price"],
    },
    class: {
      type: String,
      enum: ["economy", "premium", "business", "first"],
      default: "economy",
    },
    stops: {
      type: Number,
      default: 0,
    },
    stopCity: {
      type: String,
      default: "",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Flight", flightSchema)
