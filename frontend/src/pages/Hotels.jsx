"use client"

import { useState } from "react"
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setHasSearched(true)

    // In a real app, this would be an API call
    // For now, we'll use mock data
    setTimeout(() => {
      const mockHotels = [
        {
          id: 1,
          name: "Grand Hotel Paris",
          location: "Paris, France",
          rating: 4.7,
          reviews: 1243,
          price: 199,
          image: "/placeholder.svg?height=200&width=300",
          amenities: ["Free WiFi", "Breakfast included", "Swimming pool", "Fitness center"],
        },
        {
          id: 2,
          name: "Luxury Rome Suites",
          location: "Rome, Italy",
          rating: 4.5,
          reviews: 876,
          price: 179,
          image: "/placeholder.svg?height=200&width=300",
          amenities: ["Free WiFi", "Spa", "Restaurant", "Bar"],
        },
        {
          id: 3,
          name: "Istanbul Palace Hotel",
          location: "Istanbul, Turkey",
          rating: 4.8,
          reviews: 1567,
          price: 159,
          image: "/placeholder.svg?height=200&width=300",
          amenities: ["Free WiFi", "Breakfast included", "Rooftop terrace", "Airport shuttle"],
        },
        {
          id: 4,
          name: "Barcelona Beach Resort",
          location: "Barcelona, Spain",
          rating: 4.6,
          reviews: 1089,
          price: 189,
          image: "/placeholder.svg?height=200&width=300",
          amenities: ["Free WiFi", "Beach access", "Swimming pool", "Restaurant"],
        },
      ]

      setHotels(mockHotels)
      setIsLoading(false)
    }, 1500)
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
                  <div className="hotel-card" key={hotel.id}>
                    <div className="hotel-image">
                      <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} />
                    </div>
                    <div className="hotel-details">
                      <div className="hotel-info">
                        <h3 className="hotel-name">{hotel.name}</h3>
                        <p className="hotel-location">{hotel.location}</p>
                        <div className="hotel-rating">
                          <span className="rating-score">{hotel.rating}</span>
                          <span className="rating-text">Excellent · {hotel.reviews} reviews</span>
                        </div>
                        <div className="hotel-amenities">
                          {hotel.amenities.map((amenity, index) => (
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
