const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a hotel name"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Please provide price per night"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    roomTypes: [
      {
        type: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        capacity: {
          type: Number,
          required: true,
        },
        available: {
          type: Boolean,
          default: true,
        },
      },
    ],
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Hotel", hotelSchema)
