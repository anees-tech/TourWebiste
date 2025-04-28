const Flight = require("../models/flight.model")

// Get all flights
exports.getAllFlights = async (req, res, next) => {
  try {
    const flights = await Flight.find()

    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights,
    })
  } catch (error) {
    next(error)
  }
}

// Get flight by ID
exports.getFlightById = async (req, res, next) => {
  try {
    const flight = await Flight.findById(req.params.id)

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      })
    }

    res.status(200).json({
      success: true,
      data: flight,
    })
  } catch (error) {
    next(error)
  }
}

// Search flights
exports.searchFlights = async (req, res, next) => {
  try {
    const { from, to, departDate, returnDate, passengers, class: flightClass } = req.body

    // Build query
    const query = {
      from: { $regex: from, $options: "i" },
      to: { $regex: to, $options: "i" },
      available: true,
    }

    // Add date filter if provided
    if (departDate) {
      const date = new Date(departDate)
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)

      query.departDate = {
        $gte: date,
        $lt: nextDay,
      }
    }

    // Add class filter if provided
    if (flightClass) {
      query.class = flightClass
    }

    const flights = await Flight.find(query)

    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights,
    })
  } catch (error) {
    next(error)
  }
}
