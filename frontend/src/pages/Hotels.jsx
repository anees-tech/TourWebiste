"use client"

import { useState } from "react"
import { hotelsAPI } from "../utils/api"
import "./Hotels.css"

const Hotels = () => {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    rooms: "1",
  })

  const [hotels, setHotels] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setHasSearched(true)
    setError("")

    try {
      const response = await hotelsAPI.search(searchParams)
      if (response.success) {
        setHotels(response.data)
      }
    } catch (err) {
      setError(err.message || "Failed to search hotels")
      setHotels([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="hotels-page">
      <div className="hotels-header">
        <h1>Find Your Perfect Stay</h1>
        <p>Discover hotels, apartments, and unique homes</p>
      </div>

      <div className="hotels-search-container">
        <form onSubmit={handleSubmit} className="hotels-search-form">
          <div className="form-row">
            <div className="form-group hotel-destination">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={searchParams.destination}
                onChange={handleChange}
                placeholder="Where are you going?"
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="checkIn">Check In</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={searchParams.checkIn}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkOut">Check Out</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={searchParams.checkOut}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <select
                id="guests"
                name="guests"
                value={searchParams.guests}
                onChange={handleChange}
                className="form-control"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rooms">Rooms</label>
              <select
                id="rooms"
                name="rooms"
                value={searchParams.rooms}
                onChange={handleChange}
                className="form-control"
              >
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3 Rooms</option>
                <option value="4">4+ Rooms</option>
              </select>
            </div>
          </div>

          <button type="submit" className="search-hotels-btn">
            Search Hotels
          </button>
        </form>
      </div>

      <div className="hotels-results-container">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={handleSubmit} className="btn-primary">
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="hotels-loading">
            <div className="loading-spinner"></div>
            <p>Finding the best accommodations for you...</p>
          </div>
        ) : hasSearched ? (
          <>
            <div className="hotels-results-header">
              <h2>Hotel Results</h2>
              <p>
                {hotels.length} properties found in {searchParams.destination}
              </p>
            </div>

            {hotels.length > 0 ? (
              <div className="hotels-list">
                {hotels.map((hotel) => (
                  <div className="hotel-card" key={hotel._id}>
                    <div className="hotel-image">
                      <img src={hotel.image || "/placeholder.svg?height=200&width=300"} alt={hotel.name} />
                    </div>
                    <div className="hotel-details">
                      <div className="hotel-info">
                        <h3 className="hotel-name">{hotel.name}</h3>
                        <p className="hotel-location">{hotel.location}</p>
                        <div className="hotel-rating">
                          <span className="rating-score">{hotel.rating || "4.5"}</span>
                          <span className="rating-text">Excellent · {hotel.reviews || "0"} reviews</span>
                        </div>
                        <div className="hotel-amenities">
                          {hotel.amenities &&
                            hotel.amenities.map((amenity, index) => (
                              <span key={index} className="amenity-tag">
                                {amenity}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div className="hotel-booking">
                        <div className="hotel-price">
                          <span className="price-amount">${hotel.price}</span>
                          <span className="price-text">per night</span>
                        </div>
                        <button className="book-hotel-btn">Book Now</button>
                        <button className="hotel-details-btn">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-hotels">
                <p>No hotels found for your search criteria. Please try different dates or destination.</p>
              </div>
            )}
          </>
        ) : (
          <div className="hotels-placeholder">
            <div className="placeholder-icon">🏨</div>
            <h3>Find your home away from home</h3>
            <p>Search for hotels to start planning your perfect stay.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Hotels
