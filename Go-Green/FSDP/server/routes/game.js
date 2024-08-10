const express = require('express');
const { getGamePart, recordDeath } = require('../controllers/gameController');
const router = express.Router();

// Routes
router.get('/part/:id', getGamePart);
router.post('/record-death/:userId', recordDeath);

module.exports = router;
