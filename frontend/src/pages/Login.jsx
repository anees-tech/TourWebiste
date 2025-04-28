"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Auth.css"

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate authentication
      setTimeout(() => {
        // Check if user exists (mock check)
        if (formData.email === "admin@example.com" && formData.password === "password") {
          const userData = {
            id: 1,
            name: "Admin User",
            email: formData.email,
            role: "admin",
          }
          localStorage.setItem("user", JSON.stringify(userData))
          setUser(userData)
          navigate("/dashboard")
        } else if (formData.email === "user@example.com" && formData.password === "password") {
          const userData = {
            id: 2,
            name: "Regular User",
            email: formData.email,
            role: "user",
          }
          localStorage.setItem("user", JSON.stringify(userData))
          setUser(userData)
          navigate("/dashboard")
        } else {
          setError("Invalid email or password")
        }
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Your Account</h2>
        <p className="auth-subtitle">Welcome back! Please enter your details.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="form-control"
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="auth-google-button">Continue with Google</button>

        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>

        <div className="auth-demo">
          <p>
            <strong>Demo Accounts:</strong>
          </p>
          <p>Admin: admin@example.com / password</p>
          <p>User: user@example.com / password</p>
        </div>
      </div>
    </div>
  )
}

export default Login
