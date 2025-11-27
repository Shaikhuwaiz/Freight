import Shipment from "../models/shipmentModel.js";
import { generateHistory } from "../utils/autoRoute.js";

// ✅ Get all shipments
const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get shipment by trackingId
const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingId: req.params.id });
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create shipment WITH auto travel history
const createShipment = async (req, res) => {
  try {
    const { trackingId, origin, destination, status, expectedDelivery, lastLocation } = req.body;

    const history = generateHistory(origin, destination, status);

    // ✅ Sync final history with shipment status
    if (status === "Delivered" && history.length > 0) {
      history[history.length - 1].status = "Delivered";
    }

    const shipment = await Shipment.create({
      trackingId,
      origin,
      destination,
      status,
      expectedDelivery,
      lastLocation,
      history,
    });

    res.status(201).json(shipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete shipment (by _id)
const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });
    res.json({ message: "Shipment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Travel History
const getShipmentHistory = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingId: req.params.id });
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });
    res.json(shipment.history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add New History Entry
const addShipmentHistory = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });

    shipment.history.push({
      date: new Date(),
      status: req.body.status,
      location: req.body.location,
      details: req.body.details,
    });

    await shipment.save();
    res.json(shipment.history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getShipments,
  getShipmentById,
  createShipment,
  deleteShipment,
  getShipmentHistory,
  addShipmentHistory,
};
