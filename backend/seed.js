const mongoose = require("mongoose")
const config = require("./config")
const Tour = require("./models/tour.model")
const Flight = require("./models/flight.model")
const Hotel = require("./models/hotel.model")
const User = require("./models/user.model")

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://hello:hello123@restaurant.8j8yw.mongodb.net/TourGuide")
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

// Sample data
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin",
  },
  {
    name: "Regular User",
    email: "user@example.com",
    password: "password",
    role: "user",
  },
]

const tours = [
  {
    title: "Paris Cultural Experience",
    description:
      "Immerse yourself in the rich cultural heritage of Paris with guided tours of the Louvre, Eiffel Tower, and Notre-Dame Cathedral.",
    destination: "Paris, France",
    duration: 5,
    price: 1299,
    highlights: [
      "Skip-the-line access to the Louvre Museum",
      "Guided tour of Notre-Dame Cathedral",
      "Evening cruise on the Seine River",
      "Day trip to Versailles Palace",
    ],
    inclusions: ["4-star hotel accommodation", "Daily breakfast", "Airport transfers", "Local guide"],
    exclusions: ["International flights", "Travel insurance", "Personal expenses", "Optional activities"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paris",
        description: "Welcome to the City of Light! Transfer to your hotel and enjoy a welcome dinner.",
        activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"],
      },
      {
        day: 2,
        title: "Louvre and Tuileries",
        description: "Explore the world's most famous museum and the beautiful Tuileries Garden.",
        activities: ["Guided Louvre Museum tour", "Tuileries Garden walk", "Lunch at a local café"],
      },
    ],
    rating: 4.8,
    reviews: 124,
  },
  {
    title: "Rome Historical Tour",
    description:
      "Step back in time and explore the ancient wonders of Rome, from the Colosseum to the Vatican City and everything in between.",
    destination: "Rome, Italy",
    duration: 6,
    price: 1499,
    highlights: [
      "VIP access to the Colosseum and Roman Forum",
      "Guided tour of the Vatican Museums and Sistine Chapel",
      "Traditional Italian cooking class",
      "Day trip to Pompeii",
    ],
    inclusions: ["4-star hotel accommodation", "Daily breakfast and dinner", "Airport transfers", "Local guide"],
    exclusions: ["International flights", "Travel insurance", "Personal expenses", "Optional activities"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Rome",
        description: "Welcome to the Eternal City! Transfer to your hotel and enjoy a welcome dinner.",
        activities: ["Airport pickup", "Hotel check-in", "Welcome dinner at a traditional trattoria"],
      },
      {
        day: 2,
        title: "Ancient Rome",
        description: "Explore the iconic Colosseum and the historic Roman Forum.",
        activities: ["Guided Colosseum tour", "Roman Forum exploration", "Palatine Hill visit"],
      },
    ],
    rating: 4.7,
    reviews: 98,
  },
  {
    title: "Istanbul Discovery",
    description:
      "Experience the unique blend of European and Asian cultures in Istanbul, visiting iconic sites like the Blue Mosque and Hagia Sophia.",
    destination: "Istanbul, Turkey",
    duration: 7,
    price: 1199,
    highlights: [
      "Guided tour of the Blue Mosque and Hagia Sophia",
      "Bosphorus cruise between two continents",
      "Traditional Turkish hammam experience",
      "Culinary tour of the Spice Bazaar",
    ],
    rating: 4.9,
    reviews: 156,
  },
  {
    title: "Barcelona Highlights",
    description:
      "Discover the vibrant city of Barcelona, from Gaudí's architectural masterpieces to the beautiful beaches and delicious cuisine.",
    destination: "Barcelona, Spain",
    duration: 4,
    price: 999,
    highlights: [
      "Skip-the-line access to Sagrada Familia",
      "Guided tour of Park Güell",
      "Tapas and wine tasting experience",
      "Day trip to Montserrat",
    ],
    rating: 4.6,
    reviews: 87,
  },
]

const flights = [
  {
    airline: "Air France",
    flightNumber: "AF1234",
    from: "New York",
    to: "Paris",
    departDate: new Date("2025-05-15"),
    departTime: "08:30",
    arriveDate: new Date("2025-05-15"),
    arriveTime: "10:45",
    duration: "2h 15m",
    price: 649,
    class: "economy",
    stops: 0,
  },
  {
    airline: "Lufthansa",
    flightNumber: "LH5678",
    from: "London",
    to: "Rome",
    departDate: new Date("2025-06-10"),
    departTime: "12:15",
    arriveDate: new Date("2025-06-10"),
    arriveTime: "14:50",
    duration: "2h 35m",
    price: 329,
    class: "economy",
    stops: 0,
  },
  {
    airline: "Turkish Airlines",
    flightNumber: "TK3456",
    from: "Dubai",
    to: "Istanbul",
    departDate: new Date("2025-07-20"),
    departTime: "20:10",
    arriveDate: new Date("2025-07-20"),
    arriveTime: "23:05",
    duration: "2h 55m",
    price: 259,
    class: "economy",
    stops: 0,
  },
  {
    airline: "Iberia",
    flightNumber: "IB7890",
    from: "Miami",
    to: "Barcelona",
    departDate: new Date("2025-08-15"),
    departTime: "10:30",
    arriveDate: new Date("2025-08-15"),
    arriveTime: "13:45",
    duration: "3h 15m",
    price: 579,
    class: "economy",
    stops: 0,
  },
]

const hotels = [
  {
    name: "Grand Hotel Paris",
    location: "Paris, France",
    description:
      "Experience luxury in the heart of Paris, with stunning views of the Eiffel Tower and easy access to all major attractions.",
    price: 199,
    rating: 4.7,
    reviews: 1243,
    amenities: ["Free WiFi", "Breakfast included", "Swimming pool", "Fitness center", "Restaurant", "Bar"],
    roomTypes: [
      {
        type: "Standard",
        price: 199,
        capacity: 2,
      },
      {
        type: "Deluxe",
        price: 299,
        capacity: 2,
      },
      {
        type: "Suite",
        price: 499,
        capacity: 4,
      },
    ],
  },
  {
    name: "Luxury Rome Suites",
    location: "Rome, Italy",
    description:
      "Stay in the heart of Rome, just steps away from the Colosseum and Roman Forum in this elegant boutique hotel.",
    price: 179,
    rating: 4.5,
    reviews: 876,
    amenities: ["Free WiFi", "Spa", "Restaurant", "Bar", "Concierge service", "Airport shuttle"],
    roomTypes: [
      {
        type: "Standard",
        price: 179,
        capacity: 2,
      },
      {
        type: "Deluxe",
        price: 259,
        capacity: 2,
      },
      {
        type: "Suite",
        price: 399,
        capacity: 3,
      },
    ],
  },
  {
    name: "Istanbul Palace Hotel",
    location: "Istanbul, Turkey",
    description:
      "Experience the magic of Istanbul in this historic hotel offering panoramic views of the Bosphorus and the city skyline.",
    price: 159,
    rating: 4.8,
    reviews: 1567,
    amenities: ["Free WiFi", "Breakfast included", "Rooftop terrace", "Airport shuttle", "Spa", "Restaurant"],
    roomTypes: [
      {
        type: "Standard",
        price: 159,
        capacity: 2,
      },
      {
        type: "Deluxe",
        price: 229,
        capacity: 2,
      },
      {
        type: "Suite",
        price: 359,
        capacity: 4,
      },
    ],
  },
  {
    name: "Barcelona Beach Resort",
    location: "Barcelona, Spain",
    description:
      "Enjoy the perfect blend of city and beach at this modern resort located on Barcelona's beautiful coastline.",
    price: 189,
    rating: 4.6,
    reviews: 1089,
    amenities: ["Free WiFi", "Beach access", "Swimming pool", "Restaurant", "Bar", "Fitness center"],
    roomTypes: [
      {
        type: "Standard",
        price: 189,
        capacity: 2,
      },
      {
        type: "Deluxe",
        price: 269,
        capacity: 2,
      },
      {
        type: "Suite",
        price: 429,
        capacity: 4,
      },
    ],
  },
]

// Seed function
const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Tour.deleteMany({})
    await Flight.deleteMany({})
    await Hotel.deleteMany({})

    console.log("Data cleared")

    // Insert new data
    await User.insertMany(users)
    await Tour.insertMany(tours)
    await Flight.insertMany(flights)
    await Hotel.insertMany(hotels)

    console.log("Database seeded successfully")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seed function
seedDB()
