const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a tour title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a tour description"],
    },
    destination: {
      type: String,
      required: [true, "Please provide a destination"],
    },
    duration: {
      type: Number,
      required: [true, "Please provide tour duration"],
    },
    price: {
      type: Number,
      required: [true, "Please provide tour price"],
    },
    image: {
      type: String,
      default: "",
    },
    highlights: {
      type: [String],
      default: [],
    },
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
        activities: [String],
      },
    ],
    available: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Tour", tourSchema)
