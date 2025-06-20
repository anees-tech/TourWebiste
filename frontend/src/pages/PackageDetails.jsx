"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { toursAPI, bookingsAPI } from "../utils/api"
import "./PackageDetails.css"

const PackageDetails = () => {
  const { id } = useParams()
  const [packageData, setPackageData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    fetchPackageDetails()
  }, [id])

  const fetchPackageDetails = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await toursAPI.getById(id)
      if (response.success) {
        setPackageData(response.data)
      }
    } catch (err) {
      setError(err.message || "Failed to fetch package details")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookTour = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    if (!user.token) {
      alert("Please login to book this tour")
      return
    }

    setIsBooking(true)

    try {
      const bookingData = {
        type: "tour",
        tourId: packageData._id,
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        endDate: new Date(Date.now() + (30 + packageData.duration) * 24 * 60 * 60 * 1000),
        guests: {
          adults: 2,
          children: 0,
        },
        totalPrice: packageData.price,
        status: "pending",
      }

      const response = await bookingsAPI.create(bookingData)

      if (response.success) {
        alert("Tour booked successfully! Check your dashboard for details.")
      }
    } catch (err) {
      alert(err.message || "Failed to book tour")
    } finally {
      setIsBooking(false)
    }
  }

  if (isLoading) {
    return (
      <div className="package-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading package details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="package-not-found">
        <p>{error}</p>
        <button onClick={fetchPackageDetails} className="btn-primary">
          Retry
        </button>
      </div>
    )
  }

  if (!packageData) {
    return <div className="package-not-found">Package not found</div>
  }

  return (
    <div className="package-details-page">
      <div className="package-header">
        <div className="container">
          <h1>{packageData.title}</h1>
          <div className="package-meta">
            <span className="package-destination">{packageData.destination}</span>
            <div className="package-rating">
              <span className="rating-score">{packageData.rating || "4.5"}</span>
              <span className="rating-text">({packageData.reviews || "0"} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="package-details-content">
          <div className="package-image-container">
            <img
              src={packageData.image || "/placeholder.svg?height=500&width=800"}
              alt={packageData.title}
              className="package-main-image"
            />
          </div>

          <div className="package-info-container">
            <div className="package-info-card">
              <div className="package-price">
                <span className="price-label">Price</span>
                <span className="price-amount">${packageData.price}</span>
                <span className="price-text">per person</span>
              </div>
              <div className="package-info-item">
                <span className="info-label">Duration</span>
                <span className="info-value">{packageData.duration} days</span>
              </div>
              <div className="package-info-item">
                <span className="info-label">Destination</span>
                <span className="info-value">{packageData.destination}</span>
              </div>
              <button className="book-now-btn full-width" onClick={handleBookTour} disabled={isBooking}>
                {isBooking ? "Booking..." : "Book This Tour"}
              </button>
            </div>
          </div>

          <div className="package-description">
            <h2>Tour Overview</h2>
            <p>{packageData.description}</p>
          </div>

          {packageData.highlights && packageData.highlights.length > 0 && (
            <div className="package-highlights">
              <h2>Highlights</h2>
              <ul>
                {packageData.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="package-details-section">
            <h2>Inclusions & Exclusions</h2>
            <div className="inclusions-exclusions">
              <div className="inclusions">
                <h3>Inclusions</h3>
                <ul>
                  {packageData.inclusions && packageData.inclusions.length > 0 ? (
                    packageData.inclusions.map((item, index) => (
                      <li key={index} className="inclusion-item">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li>Hotel accommodation</li>
                  )}
                </ul>
              </div>
              <div className="exclusions">
                <h3>Exclusions</h3>
                <ul>
                  {packageData.exclusions && packageData.exclusions.length > 0 ? (
                    packageData.exclusions.map((item, index) => (
                      <li key={index} className="exclusion-item">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li>International flights</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {packageData.itinerary && packageData.itinerary.length > 0 && (
            <div className="package-itinerary">
              <h2>Itinerary</h2>
              <div className="itinerary-timeline">
                {packageData.itinerary.map((day, index) => (
                  <div key={index} className="itinerary-day">
                    <div className="day-number">Day {day.day}</div>
                    <div className="day-content">
                      <h3>{day.title}</h3>
                      <p>{day.description}</p>
                      {day.activities && day.activities.length > 0 && (
                        <div className="day-activities">
                          <h4>Activities:</h4>
                          <ul>
                            {day.activities.map((activity, idx) => (
                              <li key={idx}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PackageDetails
