import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";

// Load .env
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// Test endpoint
app.get("/", (req, res) => res.send("Freight API is running..."));

// Start server
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
