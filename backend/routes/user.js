const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/user');

router.post('/', UsersController.Create);

module.exports = router;