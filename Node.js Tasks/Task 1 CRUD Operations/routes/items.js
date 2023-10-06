const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get("/", itemController.getItem.bind(itemController));

router.post("/", itemController.addItem.bind(itemController));

router.get("/:id", itemController.getItemId.bind(itemController));

router.delete("/:id", itemController.deleteItem.bind(itemController));

router.put("/:id", itemController.updateItem.bind(itemController));

module.exports = router;