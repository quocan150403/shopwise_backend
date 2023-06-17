const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/Comment');

router.get('/', CommentController.getAll);
router.get('/:id', CommentController.getOne);
router.post('/store', CommentController.create);
router.put('/update/:id', CommentController.update);
router.delete('/delete/:id', CommentController.delete);
module.exports = router;
