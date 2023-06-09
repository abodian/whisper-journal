const express = require('express');
const router = express.Router();
const Summary = require('../models/summary')

const SummaryController = require('../controllers/summary')

router.post('/', SummaryController.Summarize)
router.get('/:id', SummaryController.Get)

module.exports = router;