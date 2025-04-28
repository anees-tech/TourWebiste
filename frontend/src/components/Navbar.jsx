"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Discover World
        </Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "menu-icon-bar open" : "menu-icon-bar"}></span>
          <span className={menuOpen ? "menu-icon-bar open" : "menu-icon-bar"}></span>
          <span className={menuOpen ? "menu-icon-bar open" : "menu-icon-bar"}></span>
        </div>

        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/flights" className="nav-link" onClick={() => setMenuOpen(false)}>
              Flights
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/hotels" className="nav-link" onClick={() => setMenuOpen(false)}>
              Hotels
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/packages" className="nav-link" onClick={() => setMenuOpen(false)}>
              Packages
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              {user.role === "admin" && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>
                    Admin
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <button className="nav-link logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link register-btn" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
