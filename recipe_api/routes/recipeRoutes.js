const express = require('express');
const RecipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/', authMiddleware, RecipeController.createRecipe);
router.get('/:id', RecipeController.getRecipeById);
router.post('/:id/like', authMiddleware, RecipeController.likeRecipe);
router.post('/:id/comment', authMiddleware, RecipeController.addCommentToRecipe);

module.exports = router;
