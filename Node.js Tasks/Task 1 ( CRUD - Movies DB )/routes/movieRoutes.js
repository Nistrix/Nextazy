const express = require("express");
const router = express.Router();
const MovieController = require('../controllers/movieController');


// Routes
router.post("/", MovieController.addMovie);
router.get("/", MovieController.getAllMovies);
router.get("/:movie_id", MovieController.getSingleMovie);
router.patch("/", MovieController.editMovie);
router.delete("/:movie_id", MovieController.deleteMovie);

module.exports = router; 
