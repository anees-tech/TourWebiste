const express = require("express")
const router = express.Router()
const hotelController = require("../controllers/hotel.controller")

router.get("/", hotelController.getAllHotels)
router.get("/:id", hotelController.getHotelById)
router.post("/search", hotelController.searchHotels)

module.exports = router
