"use client"

import { useState, useEffect } from "react"
import { bookingsAPI, usersAPI, toursAPI } from "../utils/api"
import "./AdminPanel.css"

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("bookings")
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [packages, setPackages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setIsLoading(true)
    setError("")

    try {
      switch (activeTab) {
        case "bookings":
          const bookingsResponse = await bookingsAPI.getAll()
          if (bookingsResponse.success) {
            setBookings(bookingsResponse.data)
          }
          break
        case "users":
          const usersResponse = await usersAPI.getAll()
          if (usersResponse.success) {
            setUsers(usersResponse.data)
          }
          break
        case "packages":
          const packagesResponse = await toursAPI.getAll()
          if (packagesResponse.success) {
            setPackages(packagesResponse.data)
          }
          break
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchTerm.toLowerCase()
    const userName = booking.userId?.name?.toLowerCase() || ""
    const userEmail = booking.userId?.email?.toLowerCase() || ""
    const status = booking.status.toLowerCase()

    return userName.includes(searchLower) || userEmail.includes(searchLower) || status.includes(searchLower)
  })

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    )
  })

  const filteredPackages = packages.filter((pkg) => {
    const searchLower = searchTerm.toLowerCase()
    return pkg.title.toLowerCase().includes(searchLower) || pkg.destination.toLowerCase().includes(searchLower)
  })

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await bookingsAPI.update(bookingId, { status: newStatus })
      if (response.success) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) => (booking._id === bookingId ? { ...booking, status: newStatus } : booking)),
        )
      }
    } catch (err) {
      alert(err.message || "Failed to update booking status")
    }
  }

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBooking(null)
  }

  const handlePackageAvailability = async (packageId, available) => {
    try {
      const response = await toursAPI.update(packageId, { available })
      if (response.success) {
        setPackages((prevPackages) => prevPackages.map((pkg) => (pkg._id === packageId ? { ...pkg, available } : pkg)))
      }
    } catch (err) {
      alert(err.message || "Failed to update package availability")
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage bookings, users, and tour packages</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
        <button className={`admin-tab ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
          Users
        </button>
        <button
          className={`admin-tab ${activeTab === "packages" ? "active" : ""}`}
          onClick={() => setActiveTab("packages")}
        >
          Tour Packages
        </button>
      </div>

      <div className="admin-search">
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="admin-content">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchData} className="btn-primary">
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="admin-loading">
            <div className="loading-spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : (
          <>
            {activeTab === "bookings" && (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Type</th>
                      <th>Details</th>
                      <th>Dates</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>{booking._id.slice(-6)}</td>
                          <td>
                            <div>{booking.userId?.name || "N/A"}</div>
                            <div className="table-secondary-text">{booking.userId?.email || "N/A"}</div>
                          </td>
                          <td>{booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}</td>
                          <td>
                            {booking.tourId?.title ||
                              booking.hotelId?.name ||
                              (booking.flightId
                                ? `${booking.flightId.airline} ${booking.flightId.flightNumber}`
                                : "N/A")}
                            <div className="table-secondary-text">
                              {booking.tourId?.destination ||
                                booking.hotelId?.location ||
                                (booking.flightId ? `${booking.flightId.from} to ${booking.flightId.to}` : "N/A")}
                            </div>
                          </td>
                          <td>
                            {booking.startDate && booking.endDate ? (
                              <>
                                {new Date(booking.startDate).toLocaleDateString()} -
                                {new Date(booking.endDate).toLocaleDateString()}
                              </>
                            ) : booking.departDate ? (
                              <>{new Date(booking.departDate).toLocaleDateString()}</>
                            ) : booking.checkIn && booking.checkOut ? (
                              <>
                                {new Date(booking.checkIn).toLocaleDateString()} -
                                {new Date(booking.checkOut).toLocaleDateString()}
                              </>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td>
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                              className={`status-select ${booking.status}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="canceled">Canceled</option>
                            </select>
                          </td>
                          <td>${booking.totalPrice}</td>
                          <td>
                            <button className="btn-secondary btn-sm" onClick={() => handleViewDetails(booking)}>
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="no-results">
                          No bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "users" && (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Registered</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user._id}>
                          <td>{user._id.slice(-6)}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button className="btn-secondary btn-sm">Edit</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-results">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "packages" && (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Destination</th>
                      <th>Duration</th>
                      <th>Price</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPackages.length > 0 ? (
                      filteredPackages.map((pkg) => (
                        <tr key={pkg._id}>
                          <td>{pkg._id.slice(-6)}</td>
                          <td>{pkg.title}</td>
                          <td>{pkg.destination}</td>
                          <td>{pkg.duration} days</td>
                          <td>${pkg.price}</td>
                          <td>{pkg.rating || "N/A"}</td>
                          <td>
                            <div className="toggle-switch">
                              <input
                                type="checkbox"
                                id={`toggle-${pkg._id}`}
                                checked={pkg.available}
                                onChange={(e) => handlePackageAvailability(pkg._id, e.target.checked)}
                              />
                              <label htmlFor={`toggle-${pkg._id}`}></label>
                              <span className="toggle-label">{pkg.available ? "Available" : "Unavailable"}</span>
                            </div>
                          </td>
                          <td>
                            <button className="btn-secondary btn-sm">Edit</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="no-results">
                          No packages found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Booking Details</h2>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="booking-detail-grid">
                <div className="booking-detail">
                  <label>Booking ID</label>
                  <div>{selectedBooking._id}</div>
                </div>
                <div className="booking-detail">
                  <label>Type</label>
                  <div>{selectedBooking.type.charAt(0).toUpperCase() + selectedBooking.type.slice(1)}</div>
                </div>
                <div className="booking-detail">
                  <label>Customer</label>
                  <div>{selectedBooking.userId?.name || "N/A"}</div>
                </div>
                <div className="booking-detail">
                  <label>Email</label>
                  <div>{selectedBooking.userId?.email || "N/A"}</div>
                </div>
                <div className="booking-detail">
                  <label>Status</label>
                  <div>
                    <select
                      value={selectedBooking.status}
                      onChange={(e) => handleStatusChange(selectedBooking._id, e.target.value)}
                      className={`status-select ${selectedBooking.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                </div>
                <div className="booking-detail">
                  <label>Price</label>
                  <div>${selectedBooking.totalPrice}</div>
                </div>
                <div className="booking-detail">
                  <label>Created At</label>
                  <div>{new Date(selectedBooking.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>
                Close
              </button>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
