const express = require('express');
const { predictDiabetes } = require('../controllers/predictionController');
const { predictHeartDisease } = require('../controllers/predictHeartDisease');
const router = express.Router();

router.post('/diabetes', predictDiabetes);
router.post('/heart-disease', predictHeartDisease);


module.exports = router;