"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { flightsAPI, fetchAllFlights, bookingsAPI } from "../utils/api"
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
  const [isLoading, setIsLoading] = useState(true)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState("")
  const [bookingFlightId, setBookingFlightId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadAllFlights = async () => {
      try {
        const allFlights = await fetchAllFlights()
        setFlights(allFlights)
        setError("")
      } catch (err) {
        setError("Failed to load available flights. Please try again later.")
        setFlights([])
      } finally {
        setIsLoading(false)
      }
    }

    loadAllFlights()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectFlight = async (flight) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}").token
    if (!token) {
      navigate("/login")
      return
    }

    setBookingFlightId(flight._id)
    setError("")

    try {
      const bookingData = {
        type: "flight",
        flightId: flight._id,
        guests: {
          adults: parseInt(searchParams.passengers, 10) || 1,
        },
        startDate: flight.departDate,
      }

      await bookingsAPI.create(bookingData)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Failed to book flight. Please try again.")
    } finally {
      setBookingFlightId(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setHasSearched(true)
    setError("")

    try {
      const response = await flightsAPI.search(searchParams)
      if (response.success) {
        setFlights(response.data)
      }
    } catch (err) {
      setError(err.message || "Failed to search flights")
      setFlights([])
    } finally {
      setIsLoading(false)
    }
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
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={hasSearched ? handleSubmit : () => window.location.reload()} className="btn-primary">
              {hasSearched ? "Retry Search" : "Reload Flights"}
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flights-loading">
            <div className="loading-spinner"></div>
            <p>{hasSearched ? "Searching for the best flights..." : "Loading available flights..."}</p>
          </div>
        ) : (
          <>
            <div className="flights-results-header">
              <h2>Flight Results</h2>
              <p>
                {flights.length} flights {hasSearched ? `found from ${searchParams.from} to ${searchParams.to}` : "available"}
              </p>
            </div>

            {flights.length > 0 ? (
              <div className="flights-list">
                {flights.map((flight) => (
                  <div className="flight-card" key={flight._id}>
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
                      <button
                        className="select-flight-btn"
                        onClick={() => handleSelectFlight(flight)}
                        disabled={bookingFlightId === flight._id}
                      >
                        {bookingFlightId === flight._id ? "Booking..." : "Select"}
                      </button>
                      <button className="flight-details-btn">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-flights">
                <p>{hasSearched 
                  ? "No flights found for your search criteria. Please try different dates or destinations." 
                  : "No flights are currently available. Please check back later."}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Flights
