"use client"

import { useState, useEffect } from "react"
import "./Dashboard.css"

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [bookings, setBookings] = useState({
    upcoming: [],
    past: [],
    canceled: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    setTimeout(() => {
      const mockBookings = {
        upcoming: [
          {
            id: 1,
            type: "tour",
            title: "Paris Cultural Experience",
            destination: "Paris, France",
            startDate: "2025-05-15",
            endDate: "2025-05-20",
            status: "confirmed",
            price: 1299,
            image: "/placeholder.svg?height=100&width=150",
          },
          {
            id: 2,
            type: "flight",
            airline: "Air France",
            flightNumber: "AF1234",
            from: "New York",
            to: "Paris",
            departDate: "2025-05-15",
            departTime: "08:30",
            status: "confirmed",
            price: 649,
            image: "/placeholder.svg?height=100&width=150",
          },
        ],
        past: [
          {
            id: 3,
            type: "tour",
            title: "Rome Historical Tour",
            destination: "Rome, Italy",
            startDate: "2024-11-10",
            endDate: "2024-11-16",
            status: "completed",
            price: 1499,
            image: "/placeholder.svg?height=100&width=150",
          },
        ],
        canceled: [
          {
            id: 4,
            type: "hotel",
            name: "Grand Hotel Istanbul",
            location: "Istanbul, Turkey",
            checkIn: "2024-12-20",
            checkOut: "2024-12-27",
            status: "canceled",
            price: 1120,
            image: "/placeholder.svg?height=100&width=150",
          },
        ],
      }

      setBookings(mockBookings)
      setIsLoading(false)
    }, 1000)
  }, [])

  const renderBookingCard = (booking) => {
    switch (booking.type) {
      case "tour":
        return (
          <div className="booking-card" key={booking.id}>
            <div className="booking-image">
              <img src={booking.image || "/placeholder.svg"} alt={booking.title} />
            </div>
            <div className="booking-details">
              <div className="booking-type">Tour Package</div>
              <h3 className="booking-title">{booking.title}</h3>
              <p className="booking-destination">{booking.destination}</p>
              <div className="booking-dates">
                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
              </div>
              <div className={`booking-status ${booking.status}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
            </div>
            <div className="booking-actions">
              <div className="booking-price">${booking.price}</div>
              {booking.status === "confirmed" && (
                <>
                  <button className="btn-secondary">Modify</button>
                  <button className="btn-danger">Cancel</button>
                </>
              )}
              {booking.status === "completed" && <button className="btn-secondary">Leave Review</button>}
              {booking.status === "canceled" && <button className="btn-primary">Book Again</button>}
            </div>
          </div>
        )

      case "flight":
        return (
          <div className="booking-card" key={booking.id}>
            <div className="booking-image">
              <img src={booking.image || "/placeholder.svg"} alt={booking.airline} />
            </div>
            <div className="booking-details">
              <div className="booking-type">Flight</div>
              <h3 className="booking-title">
                {booking.airline} - {booking.flightNumber}
              </h3>
              <p className="booking-destination">
                {booking.from} to {booking.to}
              </p>
              <div className="booking-dates">
                {new Date(booking.departDate).toLocaleDateString()} at {booking.departTime}
              </div>
              <div className={`booking-status ${booking.status}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
            </div>
            <div className="booking-actions">
              <div className="booking-price">${booking.price}</div>
              {booking.status === "confirmed" && (
                <>
                  <button className="btn-secondary">Check-in</button>
                  <button className="btn-danger">Cancel</button>
                </>
              )}
            </div>
          </div>
        )

      case "hotel":
        return (
          <div className="booking-card" key={booking.id}>
            <div className="booking-image">
              <img src={booking.image || "/placeholder.svg"} alt={booking.name} />
            </div>
            <div className="booking-details">
              <div className="booking-type">Hotel</div>
              <h3 className="booking-title">{booking.name}</h3>
              <p className="booking-destination">{booking.location}</p>
              <div className="booking-dates">
                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
              </div>
              <div className={`booking-status ${booking.status}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
            </div>
            <div className="booking-actions">
              <div className="booking-price">${booking.price}</div>
              {booking.status === "confirmed" && (
                <>
                  <button className="btn-secondary">Modify</button>
                  <button className="btn-danger">Cancel</button>
                </>
              )}
              {booking.status === "canceled" && <button className="btn-primary">Book Again</button>}
            </div>
          </div>
        )

      default:
        return null
    }
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
                    <button className="btn-primary">Explore Packages</button>
                  </>
                )}
                {activeTab === "past" && (
                  <>
                    <h3>No past trips</h3>
                    <p>You haven't completed any trips yet. Book your first trip today!</p>
                    <button className="btn-primary">Explore Packages</button>
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
