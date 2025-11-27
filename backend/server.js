import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("API running on " + PORT);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/freightDB";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

app.get("/", (req, res) => res.send("Freight API is running..."));

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
