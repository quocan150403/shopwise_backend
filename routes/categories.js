const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/Category');

// [GET] categories/
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getOne);
router.post('/store', CategoryController.create);
router.put('/update/:id', CategoryController.update);
router.delete('/delete/:id', CategoryController.delete);

module.exports = router;
