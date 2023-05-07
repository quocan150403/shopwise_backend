const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const category = require('../controllers/Category');

// [GET] categories/
router.get('/', category.getAll);
router.get('/:id', category.getCategoryById);

module.exports = router;
