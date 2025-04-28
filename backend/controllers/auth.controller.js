const User = require("../models/user.model")

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      })
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: "user",
    })

    await user.save()

    // Return user data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    res.status(201).json({
      success: true,
      data: userData,
    })
  } catch (error) {
    next(error)
  }
}

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Check password (in a real app, we would use bcrypt to compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Return user data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    res.status(200).json({
      success: true,
      data: userData,
    })
  } catch (error) {
    next(error)
  }
}

// Logout user
exports.logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
}
