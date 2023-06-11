const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);

module.exports = router;
