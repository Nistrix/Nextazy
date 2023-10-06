const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  _id: {
    type: String, // Use String type for UUIDs
    default: () => require("uuid").v4(), // Generate UUID as the default value
  },
  name: String,
  toppings: [String],
  price: Number,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;