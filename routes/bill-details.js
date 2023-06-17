const express = require('express');
const router = express.Router();
const BillDetailController = require('../controllers/Bill-detail');

router.get('/', BillDetailController.getAll);
router.get('/:id', BillDetailController.getOne);
router.post('/store', BillDetailController.create);
router.put('/update/:id', BillDetailController.update);
router.delete('/delete/:id', BillDetailController.delete);

module.exports = router;
