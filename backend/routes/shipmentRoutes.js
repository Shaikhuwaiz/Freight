const express = require("express");
const {
  getShipments,
  getShipmentById,
  createShipment,
} = require("../controllers/shipmentController");

const router = express.Router();

router.get("/", getShipments);
router.get("/:id", getShipmentById);
router.post("/", createShipment);

module.exports = router;
