"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Flights from "./pages/Flights"
import Hotels from "./pages/Hotels"
import Packages from "./pages/Packages"
import Dashboard from "./pages/Dashboard"
import AdminPanel from "./pages/AdminPanel"
import PackageDetails from "./pages/PackageDetails"
import "./App.css"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />
    }
    return children
  }

  const AdminRoute = ({ children }) => {
    if (!user || user.role !== "admin") {
      return <Navigate to="/" />
    }
    return children
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
