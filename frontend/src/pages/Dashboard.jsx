"use client"

import { useState, useEffect } from "react"
import { bookingsAPI } from "../utils/api"
import "./Dashboard.css"

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [bookings, setBookings] = useState({
    upcoming: [],
    past: [],
    canceled: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [activeTab])

  const fetchBookings = async () => {
    setIsLoading(true)
    setError("")

    try {
      let response
      switch (activeTab) {
        case "upcoming":
          response = await bookingsAPI.getMyUpcoming()
          break
        case "past":
          response = await bookingsAPI.getMyPast()
          break
        case "canceled":
          response = await bookingsAPI.getMyCanceled()
          break
        default:
          response = await bookingsAPI.getMy()
      }

      if (response.success) {
        setBookings((prev) => ({
          ...prev,
          [activeTab]: response.data,
        }))
      }
    } catch (err) {
      setError(err.message || "Failed to fetch bookings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const response = await bookingsAPI.cancel(bookingId)
        if (response.success) {
          // Refresh bookings
          fetchBookings()
          // Also refresh other tabs if needed
          if (activeTab === "upcoming") {
            // Move to canceled
            setActiveTab("canceled")
          }
        }
      } catch (err) {
        alert(err.message || "Failed to cancel booking")
      }
    }
  }

  const renderBookingCard = (booking) => {
    const getBookingDetails = () => {
      if (booking.type === "tour" && booking.tourId) {
        return {
          title: booking.tourId.title,
          destination: booking.tourId.destination,
          image: booking.tourId.image,
          dates: `${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}`,
        }
      } else if (booking.type === "flight" && booking.flightId) {
        return {
          title: `${booking.flightId.airline} - ${booking.flightId.flightNumber}`,
          destination: `${booking.flightId.from} to ${booking.flightId.to}`,
          image: "/placeholder.svg?height=100&width=150",
          dates: `${new Date(booking.departDate).toLocaleDateString()} at ${booking.departTime || "N/A"}`,
        }
      } else if (booking.type === "hotel" && booking.hotelId) {
        return {
          title: booking.hotelId.name,
          destination: booking.hotelId.location,
          image: booking.hotelId.image,
          dates: `${new Date(booking.checkIn).toLocaleDateString()} - ${new Date(booking.checkOut).toLocaleDateString()}`,
        }
      }
      return {
        title: "Unknown Booking",
        destination: "N/A",
        image: "/placeholder.svg?height=100&width=150",
        dates: "N/A",
      }
    }

    const details = getBookingDetails()

    return (
      <div className="booking-card" key={booking._id}>
        <div className="booking-image">
          <img src={details.image || "/placeholder.svg?height=100&width=150"} alt={details.title} />
        </div>
        <div className="booking-details">
          <div className="booking-type">{booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}</div>
          <h3 className="booking-title">{details.title}</h3>
          <p className="booking-destination">{details.destination}</p>
          <div className="booking-dates">{details.dates}</div>
          <div className={`booking-status ${booking.status}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
        <div className="booking-actions">
          <div className="booking-price">${booking.totalPrice}</div>
          {booking.status === "confirmed" && activeTab === "upcoming" && (
            <>
              <button className="btn-secondary">Modify</button>
              <button className="btn-danger" onClick={() => handleCancelBooking(booking._id)}>
                Cancel
              </button>
            </>
          )}
          {booking.status === "completed" && <button className="btn-secondary">Leave Review</button>}
          {booking.status === "canceled" && <button className="btn-primary">Book Again</button>}
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Welcome back, {user?.name || "Traveler"}!</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Trips
        </button>
        <button
          className={`dashboard-tab ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Trips
        </button>
        <button
          className={`dashboard-tab ${activeTab === "canceled" ? "active" : ""}`}
          onClick={() => setActiveTab("canceled")}
        >
          Canceled
        </button>
      </div>

      <div className="dashboard-content">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchBookings} className="btn-primary">
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="dashboard-loading">
            <div className="loading-spinner"></div>
            <p>Loading your bookings...</p>
          </div>
        ) : (
          <>
            {bookings[activeTab].length > 0 ? (
              <div className="bookings-list">{bookings[activeTab].map((booking) => renderBookingCard(booking))}</div>
            ) : (
              <div className="no-bookings">
                {activeTab === "upcoming" && (
                  <>
                    <h3>No upcoming trips</h3>
                    <p>You don't have any upcoming trips. Start planning your next adventure!</p>
                    <button className="btn-primary" onClick={() => (window.location.href = "/packages")}>
                      Explore Packages
                    </button>
                  </>
                )}
                {activeTab === "past" && (
                  <>
                    <h3>No past trips</h3>
                    <p>You haven't completed any trips yet. Book your first trip today!</p>
                    <button className="btn-primary" onClick={() => (window.location.href = "/packages")}>
                      Explore Packages
                    </button>
                  </>
                )}
                {activeTab === "canceled" && (
                  <>
                    <h3>No canceled bookings</h3>
                    <p>You don't have any canceled bookings.</p>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="dashboard-profile">
        <h2>Account Information</h2>
        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-field">
              <label>Name</label>
              <div>{user?.name || "User Name"}</div>
            </div>
            <div className="profile-field">
              <label>Email</label>
              <div>{user?.email || "user@example.com"}</div>
            </div>
            <div className="profile-field">
              <label>Member Since</label>
              <div>April 2025</div>
            </div>
            <div className="profile-field">
              <label>Membership Status</label>
              <div className="membership-status">Standard</div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn-secondary">Edit Profile</button>
            <button className="btn-secondary">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
