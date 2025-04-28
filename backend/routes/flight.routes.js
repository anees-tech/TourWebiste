const express = require("express")
const router = express.Router()
const flightController = require("../controllers/flight.controller")

router.get("/", flightController.getAllFlights)
router.get("/:id", flightController.getFlightById)
router.post("/search", flightController.searchFlights)

module.exports = router
