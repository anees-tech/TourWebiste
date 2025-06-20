const API_BASE_URL = "http://localhost:5000/api"

// Get auth token from localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  return user.token
}

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getAuthToken()

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  }

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body)
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    return data
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

// Auth API
export const authAPI = {
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: credentials,
    }),

  register: (userData) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: userData,
    }),

  getMe: () => apiRequest("/auth/me"),
}

// Tours API
export const toursAPI = {
  getAll: () => apiRequest("/tours"),
  getById: (id) => apiRequest(`/tours/${id}`),
  create: (tourData) =>
    apiRequest("/tours", {
      method: "POST",
      body: tourData,
    }),
  update: (id, tourData) =>
    apiRequest(`/tours/${id}`, {
      method: "PUT",
      body: tourData,
    }),
  delete: (id) =>
    apiRequest(`/tours/${id}`, {
      method: "DELETE",
    }),
}

// Flights API
export const flightsAPI = {
  getAll: () => apiRequest("/flights"),
  getById: (id) => apiRequest(`/flights/${id}`),
  search: (searchParams) =>
    apiRequest("/flights/search", {
      method: "POST",
      body: searchParams,
    }),
}

// fetch all flights
export const fetchAllFlights = async () => { 
  try {
    const response = await flightsAPI.getAll()
    return response.data
  } catch (error) {
    console.error("Failed to fetch flights:", error)
    throw error
  }
}

// Hotels API
export const hotelsAPI = {
  getAll: () => apiRequest("/hotels"),
  getById: (id) => apiRequest(`/hotels/${id}`),
  search: (searchParams) =>
    apiRequest("/hotels/search", {
      method: "POST",
      body: searchParams,
    }),
}

// Bookings API
export const bookingsAPI = {
  getAll: () => apiRequest("/bookings"),
  getMy: () => apiRequest("/bookings/my-bookings"),
  getMyUpcoming: () => apiRequest("/bookings/my-upcoming"), // Try a shorter path
  getMyPast: () => apiRequest("/bookings/my-bookings/past"),
  getMyCanceled: () => apiRequest("/bookings/my-bookings/canceled"),
  getById: (id) => apiRequest(`/bookings/${id}`),
  create: (bookingData) =>
    apiRequest("/bookings", {
      method: "POST",
      body: bookingData,
    }),
  update: (id, bookingData) =>
    apiRequest(`/bookings/${id}`, {
      method: "PUT",
      body: bookingData,
    }),
  cancel: (id) =>
    apiRequest(`/bookings/${id}`, {
      method: "DELETE",
    }),
}

// Users API
export const usersAPI = {
  getAll: () => apiRequest("/users"),
  getById: (id) => apiRequest(`/users/${id}`),
  update: (id, userData) =>
    apiRequest(`/users/${id}`, {
      method: "PUT",
      body: userData,
    }),
  delete: (id) =>
    apiRequest(`/users/${id}`, {
      method: "DELETE",
    }),
}
