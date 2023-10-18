const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/sendLog', logController.sendLog);

module.exports = router;
