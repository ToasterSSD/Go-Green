const express = require('express');
const { getGamePart, recordDeath } = require('../controllers/gameController');
const router = express.Router();

router.get('/part/:id', getGamePart);
router.post('/record-death', recordDeath);

module.exports = router;