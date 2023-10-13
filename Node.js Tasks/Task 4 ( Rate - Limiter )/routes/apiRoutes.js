const express = require("express");
const router = express.Router();
const sampleController = require("../controllers/apiController");
const rateLimitMiddleware = require("../middleware/rateLimitMiddleware");

//Route + Middleware 
router.get("/",rateLimitMiddleware, sampleController);

module.exports = router;
