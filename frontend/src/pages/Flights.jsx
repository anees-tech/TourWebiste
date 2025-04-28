"use client"

import { useState } from "react"
import "./Flights.css"

const Flights = () => {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: "1",
    class: "economy",
  })

  const [flights, setFlights] = useState([])
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
      const mockFlights = [
        {
          id: 1,
          airline: "Air France",
          flightNumber: "AF1234",
          from: searchParams.from,
          to: searchParams.to,
          departTime: "08:30",
          arriveTime: "10:45",
          duration: "2h 15m",
          price: 299,
          stops: 0,
        },
        {
          id: 2,
          airline: "Lufthansa",
          flightNumber: "LH5678",
          from: searchParams.from,
          to: searchParams.to,
          departTime: "12:15",
          arriveTime: "14:50",
          duration: "2h 35m",
          price: 329,
          stops: 0,
        },
        {
          id: 3,
          airline: "British Airways",
          flightNumber: "BA9012",
          from: searchParams.from,
          to: searchParams.to,
          departTime: "16:45",
          arriveTime: "19:30",
          duration: "2h 45m",
          price: 279,
          stops: 1,
          stopCity: "Brussels",
        },
        {
          id: 4,
          airline: "Turkish Airlines",
          flightNumber: "TK3456",
          from: searchParams.from,
          to: searchParams.to,
          departTime: "20:10",
          arriveTime: "23:05",
          duration: "2h 55m",
          price: 259,
          stops: 0,
        },
      ]

      setFlights(mockFlights)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flights-page">
      <div className="flights-header">
        <h1>Find Your Flight</h1>
        <p>Search for the best deals on flights to your destination</p>
      </div>

      <div className="flights-search-container">
        <form onSubmit={handleSubmit} className="flights-search-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <input
                type="text"
                id="from"
                name="from"
                value={searchParams.from}
                onChange={handleChange}
                placeholder="City or airport"
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="to">To</label>
              <input
                type="text"
                id="to"
                name="to"
                value={searchParams.to}
                onChange={handleChange}
                placeholder="City or airport"
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departDate">Depart</label>
              <input
                type="date"
                id="departDate"
                name="departDate"
                value={searchParams.departDate}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="returnDate">Return</label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={searchParams.returnDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="passengers">Passengers</label>
              <select
                id="passengers"
                name="passengers"
                value={searchParams.passengers}
                onChange={handleChange}
                className="form-control"
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5+ Passengers</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="class">Class</label>
              <select
                id="class"
                name="class"
                value={searchParams.class}
                onChange={handleChange}
                className="form-control"
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>

          <button type="submit" className="search-flights-btn">
            Search Flights
          </button>
        </form>
      </div>

      <div className="flights-results-container">
        {isLoading ? (
          <div className="flights-loading">
            <div className="loading-spinner"></div>
            <p>Searching for the best flights...</p>
          </div>
        ) : hasSearched ? (
          <>
            <div className="flights-results-header">
              <h2>Flight Results</h2>
              <p>
                {flights.length} flights found from {searchParams.from} to {searchParams.to}
              </p>
            </div>

            {flights.length > 0 ? (
              <div className="flights-list">
                {flights.map((flight) => (
                  <div className="flight-card" key={flight.id}>
                    <div className="flight-card-header">
                      <div className="airline-info">
                        <div className="airline-logo">{flight.airline.charAt(0)}</div>
                        <div>
                          <div className="airline-name">{flight.airline}</div>
                          <div className="flight-number">{flight.flightNumber}</div>
                        </div>
                      </div>
                      <div className="flight-price">
                        <span className="price-amount">${flight.price}</span>
                        <span className="price-text">per person</span>
                      </div>
                    </div>

                    <div className="flight-card-body">
                      <div className="flight-times">
                        <div className="depart-time">
                          <div className="time">{flight.departTime}</div>
                          <div className="city">{flight.from}</div>
                        </div>

                        <div className="flight-duration">
                          <div className="duration-line">{flight.stops > 0 && <div className="stop-dot"></div>}</div>
                          <div className="duration-text">
                            {flight.duration}
                            {flight.stops > 0 && ` · ${flight.stops} stop`}
                          </div>
                          {flight.stops > 0 && <div className="stop-city">{flight.stopCity}</div>}
                        </div>

                        <div className="arrive-time">
                          <div className="time">{flight.arriveTime}</div>
                          <div className="city">{flight.to}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flight-card-footer">
                      <button className="select-flight-btn">Select</button>
                      <button className="flight-details-btn">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-flights">
                <p>No flights found for your search criteria. Please try different dates or destinations.</p>
              </div>
            )}
          </>
        ) : (
          <div className="flights-placeholder">
            <div className="placeholder-icon">✈️</div>
            <h3>Ready to take off?</h3>
            <p>Search for flights to get started on your next adventure.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Flights
