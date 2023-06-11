const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/Product');

router.get('/rename', ProductController.rename);
router.get('/', ProductController.getAll);
router.get('/new', ProductController.getNewProduct);
router.get('/hot', ProductController.getHotProduct);
router.get('/view', ProductController.getViewProduct);
router.get('/search/:keyword', ProductController.getProductsByKeyword);
router.get('/category/:id', ProductController.getProductsByCategoryId);
router.get('/:id', ProductController.getOne);
router.post('/store', ProductController.create);
router.put('/update/:id', ProductController.update);
router.delete('/delete/:id', ProductController.delete);

module.exports = router;
