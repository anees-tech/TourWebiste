"use client"

import { useState, useEffect } from "react"
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

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    setTimeout(() => {
      const mockBookings = [
        {
          id: 1,
          userId: 101,
          userName: "John Smith",
          userEmail: "john@example.com",
          type: "tour",
          title: "Paris Cultural Experience",
          destination: "Paris, France",
          startDate: "2025-05-15",
          endDate: "2025-05-20",
          status: "confirmed",
          price: 1299,
          createdAt: "2025-04-01T10:30:00Z",
        },
        {
          id: 2,
          userId: 102,
          userName: "Sarah Johnson",
          userEmail: "sarah@example.com",
          type: "flight",
          airline: "Air France",
          flightNumber: "AF1234",
          from: "New York",
          to: "Paris",
          departDate: "2025-05-15",
          departTime: "08:30",
          status: "confirmed",
          price: 649,
          createdAt: "2025-04-02T14:15:00Z",
        },
        {
          id: 3,
          userId: 103,
          userName: "Michael Chen",
          userEmail: "michael@example.com",
          type: "tour",
          title: "Rome Historical Tour",
          destination: "Rome, Italy",
          startDate: "2025-06-10",
          endDate: "2025-06-16",
          status: "pending",
          price: 1499,
          createdAt: "2025-04-03T09:45:00Z",
        },
        {
          id: 4,
          userId: 104,
          userName: "Elena Petrova",
          userEmail: "elena@example.com",
          type: "hotel",
          name: "Grand Hotel Istanbul",
          location: "Istanbul, Turkey",
          checkIn: "2025-07-20",
          checkOut: "2025-07-27",
          status: "canceled",
          price: 1120,
          createdAt: "2025-04-04T16:20:00Z",
        },
      ]

      const mockUsers = [
        {
          id: 101,
          name: "John Smith",
          email: "john@example.com",
          role: "user",
          registeredAt: "2025-01-15T08:30:00Z",
          bookingsCount: 3,
          totalSpent: 2948,
        },
        {
          id: 102,
          name: "Sarah Johnson",
          email: "sarah@example.com",
          role: "user",
          registeredAt: "2025-02-20T14:45:00Z",
          bookingsCount: 1,
          totalSpent: 649,
        },
        {
          id: 103,
          name: "Michael Chen",
          email: "michael@example.com",
          role: "user",
          registeredAt: "2025-03-05T11:15:00Z",
          bookingsCount: 2,
          totalSpent: 2699,
        },
        {
          id: 104,
          name: "Elena Petrova",
          email: "elena@example.com",
          role: "user",
          registeredAt: "2025-03-18T09:30:00Z",
          bookingsCount: 1,
          totalSpent: 1120,
        },
        {
          id: 105,
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          registeredAt: "2025-01-01T00:00:00Z",
          bookingsCount: 0,
          totalSpent: 0,
        },
      ]

      const mockPackages = [
        {
          id: 1,
          title: "Paris Cultural Experience",
          destination: "Paris, France",
          duration: 5,
          price: 1299,
          available: true,
          bookingsCount: 15,
        },
        {
          id: 2,
          title: "Rome Historical Tour",
          destination: "Rome, Italy",
          duration: 6,
          price: 1499,
          available: true,
          bookingsCount: 12,
        },
        {
          id: 3,
          title: "Istanbul Discovery",
          destination: "Istanbul, Turkey",
          duration: 7,
          price: 1199,
          available: true,
          bookingsCount: 8,
        },
        {
          id: 4,
          title: "Barcelona Highlights",
          destination: "Barcelona, Spain",
          duration: 4,
          price: 999,
          available: false,
          bookingsCount: 20,
        },
      ]

      setBookings(mockBookings)
      setUsers(mockUsers)
      setPackages(mockPackages)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.title && booking.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.destination && booking.destination.toLowerCase().includes(searchTerm.toLowerCase())) ||
      booking.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
    )
  }

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBooking(null)
  }

  const handlePackageAvailability = (packageId, available) => {
    setPackages((prevPackages) => prevPackages.map((pkg) => (pkg.id === packageId ? { ...pkg, available } : pkg)))
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
                        <tr key={booking.id}>
                          <td>{booking.id}</td>
                          <td>
                            <div>{booking.userName}</div>
                            <div className="table-secondary-text">{booking.userEmail}</div>
                          </td>
                          <td>{booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}</td>
                          <td>
                            {booking.title || booking.name || `${booking.airline} ${booking.flightNumber}`}
                            <div className="table-secondary-text">
                              {booking.destination || `${booking.from} to ${booking.to}` || booking.location}
                            </div>
                          </td>
                          <td>
                            {booking.startDate && booking.endDate ? (
                              <>
                                {new Date(booking.startDate).toLocaleDateString()} -
                                {new Date(booking.endDate).toLocaleDateString()}
                              </>
                            ) : booking.departDate ? (
                              <>
                                {new Date(booking.departDate).toLocaleDateString()} at {booking.departTime}
                              </>
                            ) : (
                              <>
                                {new Date(booking.checkIn).toLocaleDateString()} -
                                {new Date(booking.checkOut).toLocaleDateString()}
                              </>
                            )}
                          </td>
                          <td>
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                              className={`status-select ${booking.status}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="canceled">Canceled</option>
                            </select>
                          </td>
                          <td>${booking.price}</td>
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
                      <th>Bookings</th>
                      <th>Total Spent</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.role}`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td>{new Date(user.registeredAt).toLocaleDateString()}</td>
                          <td>{user.bookingsCount}</td>
                          <td>${user.totalSpent}</td>
                          <td>
                            <button className="btn-secondary btn-sm">Edit</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="no-results">
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
                      <th>Bookings</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPackages.length > 0 ? (
                      filteredPackages.map((pkg) => (
                        <tr key={pkg.id}>
                          <td>{pkg.id}</td>
                          <td>{pkg.title}</td>
                          <td>{pkg.destination}</td>
                          <td>{pkg.duration} days</td>
                          <td>${pkg.price}</td>
                          <td>{pkg.bookingsCount}</td>
                          <td>
                            <div className="toggle-switch">
                              <input
                                type="checkbox"
                                id={`toggle-${pkg.id}`}
                                checked={pkg.available}
                                onChange={(e) => handlePackageAvailability(pkg.id, e.target.checked)}
                              />
                              <label htmlFor={`toggle-${pkg.id}`}></label>
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
                  <div>{selectedBooking.id}</div>
                </div>
                <div className="booking-detail">
                  <label>Type</label>
                  <div>{selectedBooking.type.charAt(0).toUpperCase() + selectedBooking.type.slice(1)}</div>
                </div>
                <div className="booking-detail">
                  <label>Customer</label>
                  <div>{selectedBooking.userName}</div>
                </div>
                <div className="booking-detail">
                  <label>Email</label>
                  <div>{selectedBooking.userEmail}</div>
                </div>
                <div className="booking-detail">
                  <label>Title</label>
                  <div>
                    {selectedBooking.title ||
                      selectedBooking.name ||
                      `${selectedBooking.airline} ${selectedBooking.flightNumber}`}
                  </div>
                </div>
                <div className="booking-detail">
                  <label>Destination</label>
                  <div>
                    {selectedBooking.destination ||
                      `${selectedBooking.from} to ${selectedBooking.to}` ||
                      selectedBooking.location}
                  </div>
                </div>
                <div className="booking-detail">
                  <label>Dates</label>
                  <div>
                    {selectedBooking.startDate && selectedBooking.endDate ? (
                      <>
                        {new Date(selectedBooking.startDate).toLocaleDateString()} -
                        {new Date(selectedBooking.endDate).toLocaleDateString()}
                      </>
                    ) : selectedBooking.departDate ? (
                      <>
                        {new Date(selectedBooking.departDate).toLocaleDateString()} at {selectedBooking.departTime}
                      </>
                    ) : (
                      <>
                        {new Date(selectedBooking.checkIn).toLocaleDateString()} -
                        {new Date(selectedBooking.checkOut).toLocaleDateString()}
                      </>
                    )}
                  </div>
                </div>
                <div className="booking-detail">
                  <label>Status</label>
                  <div>
                    <select
                      value={selectedBooking.status}
                      onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
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
                  <div>${selectedBooking.price}</div>
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
