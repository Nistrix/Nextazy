const express = require("express");
const router = express.Router();
const GithubController = require("../controllers/githubController");
const cache = require("../middleware/cacheMiddleware");

// Define your routes here
router.get("/repos/:username", cache, GithubController.getRepos);

module.exports = router;
