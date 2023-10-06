const { v4 } = require("uuid");
const mongoose = require("mongoose");
const Item = require("../model/schema"); // Import your Mongoose Item model

class ItemController {
  constructor() {}

  async addItem(req, res) {
    try {
      const item = req.body;
      const newItem = new Item({ ...item, id: v4() });
      await newItem.save();
      res.send(`Item "${item.name}" has been added successfully.`);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred while creating an item.");
    }
  }

  async getItem(req, res) {
    try {
      const items = await Item.find({});
      res.json(items);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred while fetching items.");
    }
  }

  async getItemId(req, res) {
    try {
      const { id } = req.params;
      const itemFound = await Item.findById(id);
      if (!itemFound) {
        res.status(404).send("Item not found.");
        return;
      }
      console.log(itemFound);
      res.send(itemFound);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred while fetching the item by ID.");
    }
  }

  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const deletedItem = await Item.findOneAndDelete({ _id: id });
      if (!deletedItem) {
        res.status(404).send("Item not found.");
        return;
      }
      console.log(`Item with id ${id} has been deleted successfully.`);
      res.send(`Item with id ${id} has been deleted successfully.`);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred while deleting the item.");
    }
  }

  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { name, toppings, price } = req.body;
      const item = await Item.findById(id);
      if (!item) {
        res.status(404).send("Item not found.");
        return;
      }
      if (name) item.name = name;
      if (toppings) item.toppings = toppings;
      if (price) item.price = price;
      await item.save();
      res.send(`Item with id ${id} and name ${item.name} has been updated successfully`);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred while updating the item.");
    }
  }
}

module.exports = new ItemController();
