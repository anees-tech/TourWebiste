const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes")
const errorHandler = require("./middleware/errorHandler")
const config = require("./config")

const app = express()

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://hello:hello123@restaurant.8j8yw.mongodb.net/TourGuide", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api", routes)

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Tour Guide API is running!" })
})

// Error handling middleware
app.use(errorHandler)

// Start server
const PORT = config.port || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
