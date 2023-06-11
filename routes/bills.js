const express = require('express');
const router = express.Router();
const BillController = require('../controllers/Bill');

router.get('/', BillController.getAll);
router.get('/:id', BillController.getOne);
router.post('/store', BillController.create);
router.put('/update/:id', BillController.update);
router.delete('/delete/:id', BillController.delete);

module.exports = router;
