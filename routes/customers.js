const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/Customer');

router.get('/', CustomerController.getAll);
router.get('/:id', CustomerController.getOne);
router.post('/store', CustomerController.create);
router.put('/update/:id', CustomerController.update);
router.delete('/delete/:id', CustomerController.delete);

module.exports = router;
