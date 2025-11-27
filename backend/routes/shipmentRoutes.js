import express from "express";
import {
  getShipments,
  getShipmentById,
  createShipment,
  deleteShipment,
  getShipmentHistory,
  addShipmentHistory,
} from "../controllers/shipmentController.js";

const router = express.Router();

router.get("/", getShipments);
router.get("/:id", getShipmentById);
router.post("/", createShipment);
router.delete("/:id", deleteShipment);

// ✅ New History Routes
router.get("/:id/history", getShipmentHistory);
router.post("/:id/history", addShipmentHistory);

export default router;
