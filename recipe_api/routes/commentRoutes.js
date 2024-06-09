const express = require('express');
const CommentController = require('../controllers/commentController');

const router = express.Router();

router.post('/', CommentController.createComment);
router.get('/recipe/:recipeId', CommentController.getCommentsByRecipeId); 
router.get('/:id', CommentController.getCommentById);

module.exports = router;
