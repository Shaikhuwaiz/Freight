import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import resendWebhook from "./routes/resendWebhook.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);

// ONLY THIS (ONE) webhook route
app.use("/api/resend-webhook", resendWebhook);

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

app.get("/", (req, res) => res.send("✅Freight API is running..."));

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
