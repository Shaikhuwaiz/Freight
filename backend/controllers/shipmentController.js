const Shipment = require("../models/shipmentModel");

// Get all shipments
const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get shipment by trackingId
const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingId: req.params.id }); // <-- fix
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new shipment
const createShipment = async (req, res) => {
  try {
    const shipment = new Shipment(req.body);
    const savedShipment = await shipment.save();
    res.status(201).json(savedShipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getShipments,
  getShipmentById,
  createShipment,
};
