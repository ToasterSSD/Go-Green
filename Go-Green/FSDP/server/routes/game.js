// routes/game.js
const express = require('express');
const { saveGameProgress, loadGameProgress, deleteGameProgress } = require('../controllers/gameController');
const { validateToken } = require('../middlewares/auth'); // Ensure correct import path
const router = express.Router();

// Apply the middlewares to the routes that need them
router.post('/saveGameProgress', validateToken, saveGameProgress); // validateToken is required here
router.get('/loadGameProgress', validateToken, loadGameProgress);  // validateToken is required here
router.delete('/deleteGameProgress', validateToken, deleteGameProgress);  // validateToken is required here

module.exports = router;
