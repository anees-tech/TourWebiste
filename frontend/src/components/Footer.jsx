import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Discover World</h3>
          <p>
            Explore the world's most beautiful destinations with our expert guides and personalized travel experiences.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/flights">Flights</a>
            </li>
            <li>
              <a href="/hotels">Hotels</a>
            </li>
            <li>
              <a href="/packages">Packages</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Popular Destinations</h3>
          <ul className="footer-links">
            <li>
              <a href="/packages?country=france">France</a>
            </li>
            <li>
              <a href="/packages?country=italy">Italy</a>
            </li>
            <li>
              <a href="/packages?country=turkey">Turkey</a>
            </li>
            <li>
              <a href="/packages?country=spain">Spain</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@discoverworld.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Discover World. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
