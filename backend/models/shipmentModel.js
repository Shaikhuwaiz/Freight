const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  trackingId: String,
  status: String,
  origin: String,
  destination: String,
  expectedDelivery: Date,
  lastLocation: String,
});

module.exports = mongoose.model("Shipment", shipmentSchema);
