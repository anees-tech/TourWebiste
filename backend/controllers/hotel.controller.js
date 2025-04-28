const Hotel = require("../models/hotel.model")

// Get all hotels
exports.getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find()

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    })
  } catch (error) {
    next(error)
  }
}

// Get hotel by ID
exports.getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      })
    }

    res.status(200).json({
      success: true,
      data: hotel,
    })
  } catch (error) {
    next(error)
  }
}

// Search hotels
exports.searchHotels = async (req, res, next) => {
  try {
    const { destination, checkIn, checkOut, guests, rooms } = req.body

    // Build query
    const query = {
      location: { $regex: destination, $options: "i" },
      available: true,
    }

    const hotels = await Hotel.find(query)

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    })
  } catch (error) {
    next(error)
  }
}
