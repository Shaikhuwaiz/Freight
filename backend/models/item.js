import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: "in transit" },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
