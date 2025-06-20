// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected"); // include your protected routes

app.use("/api", authRoutes);
app.use("/api", protectedRoutes); // secure endpoints like /api/dashboard

app.listen(process.env.PORT || 5500, () => {
  console.log(`Server running on port ${process.env.PORT || 5500}`);
});

