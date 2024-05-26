const express = require('express');
const RecipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/', RecipeController.getRecipeAll);
router.post('/', RecipeController.createRecipe);
router.get('/:id', RecipeController.getRecipeById);
router.post('/:id/like', RecipeController.likeRecipe);
router.post('/:id/comment', RecipeController.addCommentToRecipe);

module.exports = router;
