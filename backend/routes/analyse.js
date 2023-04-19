const express = require('express');
const router = express.Router();
const AnalysisController = require('../controllers/analyse');

router.post('/', AnalysisController.Analyse);

module.exports = router;
