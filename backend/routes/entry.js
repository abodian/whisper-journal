const express = require('express');
const router = express.Router();
const Entry = require('../models/entry')

const EntryController = require('../controllers/entry');

router.get('/:id', EntryController.Get)
router.post('/', EntryController.Create);

module.exports = router;