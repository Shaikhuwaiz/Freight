import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Example routes for fake plane tracking
const flights = [
  {
    id: "flight-1",
    path: [
      [48.8566, 2.3522],   // Paris
      [51.5074, -0.1278],  // London
      [40.7128, -74.0060], // New York
      [34.0522, -118.2437] // Los Angeles
    ],
    index: 0,
  },
  {
    id: "flight-2",
    path: [
      [35.6895, 139.6917], // Tokyo
      [37.7749, -122.4194], // San Francisco
      [40.7128, -74.0060], // New York
    ],
    index: 0,
  },
  {
    id: "flight-3",
    path: [
      [19.0760, 72.8777],  // Mumbai
      [25.276987, 55.296249], // Dubai
      [48.8566, 2.3522],   // Paris
    ],
    index: 0,
  },
];

// When a client connects
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("subscribeShipment", (shipmentId) => {
    console.log(`Subscribed to ${shipmentId}`);
  });

  socket.on("unsubscribe", (shipmentId) => {
    console.log(`Unsubscribed from ${shipmentId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Emit updated flight positions every few seconds
setInterval(() => {
  flights.forEach((flight) => {
    const coords = flight.path[flight.index];
    io.emit("shipmentPosition", {
      shipmentId: flight.id,
      pos: { lat: coords[0], lng: coords[1] },
    });

    flight.index = (flight.index + 1) % flight.path.length; // Loop
  });
}, 3000);

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`🛫 Tracking server running on port ${PORT}`);
});
