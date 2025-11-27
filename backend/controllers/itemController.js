import Item from "../models/item.js";

// GET all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items", error: err.message });
  }
};

// CREATE new item
export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item created successfully", newItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to create item", error: err.message });
  }
};

// DELETE item by ID
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item", error: err.message });
  }
};
