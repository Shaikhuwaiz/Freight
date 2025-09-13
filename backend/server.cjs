const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routers
const itemRoutes = require("./routes/itemroutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

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
app.use("/items", itemRoutes);           
app.use("/shipments", shipmentRoutes);   

// Optional: root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
