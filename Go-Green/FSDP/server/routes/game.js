// routes/game.js
const express = require('express');
const { saveGameProgress, loadGameProgress, deleteGameProgress } = require('../controllers/gameController');
const router = express.Router();

// Route to save game progress
router.post('/saveGameProgress', saveGameProgress);

// Route to load game progress
router.get('/loadGameProgress', loadGameProgress);

// Route to delete game progress
router.delete('/deleteGameProgress', deleteGameProgress);

module.exports = router;
