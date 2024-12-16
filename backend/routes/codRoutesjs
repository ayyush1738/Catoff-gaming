const express = require('express');
const { getPlayerStats, placeBet, validateStats } = require('../controllers/codController');

const router = express.Router();

router.get('/player/:platform/:username', getPlayerStats);
router.post('/bet', placeBet);
router.post('/validate', validateStats);

module.exports = router;
