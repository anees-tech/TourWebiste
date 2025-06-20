"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toursAPI } from "../utils/api"
import "./Home.css"

const Home = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchFeaturedDestinations()
  }, [])

  const fetchFeaturedDestinations = async () => {
    try {
      const response = await toursAPI.getAll()
      if (response.success) {
        // Get first 4 tours as featured destinations
        setFeaturedDestinations(response.data.slice(0, 4))
      }
    } catch (err) {
      setError(err.message || "Failed to fetch destinations")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the World's Cultural and Historical Treasures</h1>
          <p>Unforgettable travel experiences tailored to your interests</p>
          <div className="hero-buttons">
            <Link to="/packages" className="btn-primary">
              Explore Tours
            </Link>
            <Link to="/flights" className="btn-secondary">
              Find Flights
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <h2>Find Your Perfect Trip</h2>
          <div className="search-tabs">
            <button className="search-tab active">Tours</button>
            <button className="search-tab">Flights</button>
            <button className="search-tab">Hotels</button>
          </div>
          <div className="search-form">
            <div className="form-group">
              <label>Destination</label>
              <input type="text" placeholder="Where do you want to go?" className="form-control" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Check In</label>
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>Check Out</label>
                <input type="date" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label>Travelers</label>
              <select className="form-control">
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
              </select>
            </div>
            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Destinations</h2>
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchFeaturedDestinations} className="btn-primary">
                Retry
              </button>
            </div>
          )}
          {isLoading ? (
            <div className="loading">Loading destinations...</div>
          ) : (
            <div className="destinations-grid">
              {featuredDestinations.map((destination) => (
                <div className="destination-card" key={destination._id}>
                  <div className="destination-img">
                    <img src={destination.image || `/placeholder.svg?height=300&width=400`} alt={destination.title} />
                  </div>
                  <div className="destination-content">
                    <h3>{destination.title}</h3>
                    <p>{destination.description}</p>
                    <div className="destination-footer">
                      <span className="price">From ${destination.price}</span>
                      <Link to={`/packages/${destination._id}`} className="view-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🌍</div>
              <h3>Expert Guides</h3>
              <p>Our knowledgeable guides bring history and culture to life at every destination.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h3>Best Value</h3>
              <p>Competitive prices with no hidden fees and plenty of inclusions.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <h3>Safe Travel</h3>
              <p>Your safety is our priority with 24/7 support during your journey.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h3>Tailored Experiences</h3>
              <p>Customized itineraries based on your interests and preferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Travelers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "The Paris tour exceeded all my expectations. Our guide was incredibly knowledgeable and showed us
                  hidden gems we would never have found on our own."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-name">Sarah Johnson</div>
                <div className="author-trip">Paris Cultural Tour</div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "From the Colosseum to the Vatican, our Rome experience was unforgettable. The small group size made
                  it personal and engaging."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-name">Michael Chen</div>
                <div className="author-trip">Rome Historical Tour</div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "Istanbul was magical! The tour perfectly balanced historical sites, local cuisine, and free time to
                  explore on our own."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-name">Elena Petrova</div>
                <div className="author-trip">Istanbul Discovery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-container">
            <div className="newsletter-content">
              <h2>Get Inspired for Your Next Journey</h2>
              <p>Subscribe to our newsletter for travel tips, exclusive offers, and destination insights.</p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" className="form-control" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
