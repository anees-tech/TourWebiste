"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toursAPI } from "../utils/api"
import "./Packages.css"

const Packages = () => {
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    destination: "",
    duration: "",
    budget: "",
    sortBy: "recommended",
  })

  useEffect(() => {
    fetchPackages()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [packages, filters])

  const fetchPackages = async () => {
    try {
      const response = await toursAPI.getAll()
      if (response.success) {
        setPackages(response.data)
        setFilteredPackages(response.data)
      }
    } catch (err) {
      setError(err.message || "Failed to fetch packages")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const applyFilters = () => {
    let filtered = [...packages]

    // Filter by destination
    if (filters.destination) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.destination.toLowerCase().includes(filters.destination.toLowerCase()) ||
          pkg.title.toLowerCase().includes(filters.destination.toLowerCase()),
      )
    }

    // Filter by duration
    if (filters.duration) {
      const [min, max] = filters.duration.split("-").map(Number)
      filtered = filtered.filter((pkg) => pkg.duration >= min && (max ? pkg.duration <= max : true))
    }

    // Filter by budget
    if (filters.budget) {
      const [min, max] = filters.budget.split("-").map(Number)
      filtered = filtered.filter((pkg) => pkg.price >= min && (max ? pkg.price <= max : true))
    }

    // Sort packages
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "duration-short":
        filtered.sort((a, b) => a.duration - b.duration)
        break
      case "duration-long":
        filtered.sort((a, b) => b.duration - a.duration)
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // 'recommended' - no specific sort
        break
    }

    setFilteredPackages(filtered)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    applyFilters()
  }

  return (
    <div className="packages-page">
      <div className="packages-header">
        <h1>Explore Our Tour Packages</h1>
        <p>Discover curated travel experiences to the world's most fascinating destinations</p>
      </div>

      <div className="packages-container">
        <div className="packages-sidebar">
          <div className="filter-container">
            <h3>Filter Packages</h3>
            <form onSubmit={handleSubmit}>
              <div className="filter-group">
                <label htmlFor="destination">Destination</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={filters.destination}
                  onChange={handleFilterChange}
                  placeholder="Search destinations"
                  className="form-control"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="duration">Duration (days)</label>
                <select
                  id="duration"
                  name="duration"
                  value={filters.duration}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">Any duration</option>
                  <option value="1-3">1-3 days</option>
                  <option value="4-7">4-7 days</option>
                  <option value="8-14">8-14 days</option>
                  <option value="15">15+ days</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="budget">Budget ($)</label>
                <select
                  id="budget"
                  name="budget"
                  value={filters.budget}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">Any budget</option>
                  <option value="0-1000">Under $1,000</option>
                  <option value="1000-1500">$1,000 - $1,500</option>
                  <option value="1500-2000">$1,500 - $2,000</option>
                  <option value="2000">$2,000+</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sortBy">Sort By</label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration-short">Duration: Shortest First</option>
                  <option value="duration-long">Duration: Longest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <button type="submit" className="apply-filters-btn">
                Apply Filters
              </button>
            </form>
          </div>
        </div>

        <div className="packages-content">
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchPackages} className="btn-primary">
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="packages-loading">
              <div className="loading-spinner"></div>
              <p>Loading amazing travel packages...</p>
            </div>
          ) : (
            <>
              <div className="packages-results-header">
                <h2>Available Tour Packages</h2>
                <p>{filteredPackages.length} packages found</p>
              </div>

              {filteredPackages.length > 0 ? (
                <div className="packages-list">
                  {filteredPackages.map((pkg) => (
                    <div className="package-card" key={pkg._id}>
                      <div className="package-image">
                        <img src={pkg.image || "/placeholder.svg?height=300&width=500"} alt={pkg.title} />
                        <div className="package-duration">
                          <span>{pkg.duration} days</span>
                        </div>
                      </div>
                      <div className="package-content">
                        <h3 className="package-title">{pkg.title}</h3>
                        <p className="package-destination">{pkg.destination}</p>
                        <div className="package-rating">
                          <span className="rating-score">{pkg.rating || "4.5"}</span>
                          <span className="rating-text">({pkg.reviews || "0"} reviews)</span>
                        </div>
                        <p className="package-description">{pkg.description}</p>
                        <div className="package-highlights">
                          <h4>Highlights:</h4>
                          <ul>
                            {pkg.highlights &&
                              pkg.highlights.slice(0, 2).map((highlight, index) => <li key={index}>{highlight}</li>)}
                          </ul>
                        </div>
                        <div className="package-footer">
                          <div className="package-price">
                            <span className="price-amount">${pkg.price}</span>
                            <span className="price-text">per person</span>
                          </div>
                          <div className="package-actions">
                            <Link to={`/packages/${pkg._id}`} className="view-details-btn">
                              View Details
                            </Link>
                            <button className="book-now-btn">Book Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-packages">
                  <p>No packages found matching your criteria. Please try different filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Packages
