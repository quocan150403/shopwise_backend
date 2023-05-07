const express = require('express');
const router = express.Router();

const product = require('../controllers/Product');

router.get('/', product.getAll);
router.get('/new', product.getNewProduct);
router.get('/hot', product.getHotProduct);
router.get('/view', product.getViewProduct);
router.get('/search/:keyword', product.getProductsByKeyword);
router.get('/category/:id', product.getProductsByCategoryId);
router.get('/:id', product.getProductById);

module.exports = router;
