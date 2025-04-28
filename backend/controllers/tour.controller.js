const Tour = require("../models/tour.model")

// Get all tours
exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await Tour.find()

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    })
  } catch (error) {
    next(error)
  }
}

// Get tour by ID
exports.getTourById = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id)

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      })
    }

    res.status(200).json({
      success: true,
      data: tour,
    })
  } catch (error) {
    next(error)
  }
}

// Create new tour
exports.createTour = async (req, res, next) => {
  try {
    const tour = await Tour.create(req.body)

    res.status(201).json({
      success: true,
      data: tour,
    })
  } catch (error) {
    next(error)
  }
}

// Update tour
exports.updateTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      })
    }

    res.status(200).json({
      success: true,
      data: tour,
    })
  } catch (error) {
    next(error)
  }
}

// Delete tour
exports.deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}
