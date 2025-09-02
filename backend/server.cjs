const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routers
const itemRoutes = require("/routes/itemRoutes"); // adjust path
const shipmentRoutes = require("./routes/shipmentRoutes"); // adjust path

const app = express();
const PORT = 7000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/shipmentsDB");

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Use routers
app.use("/items", itemRoutes);           // all item routes start with /items
app.use("/shipments", shipmentRoutes);   // all shipment routes start with /shipments

// Optional: root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
