const express = require('express');
const CommentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/:recipeId', CommentController.createComment);
router.get('/:id', CommentController.getCommentById);

module.exports = router;
