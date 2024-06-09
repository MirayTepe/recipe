const express = require('express');
const RecipeController = require('../controllers/recipeController');
const checkAuthenticated=require('../middleware/checkAuthenticated')
const router = express.Router();
router.get('/search', RecipeController.searchRecipes);
router.get('/', RecipeController.getRecipeAll);
router.get('/recipebycategory', RecipeController.getRecipesByCategory);
router.get('/ingredient/:ingredientId', RecipeController.getRecipesByIngredient);
router.get('/by-user/:userId',checkAuthenticated, RecipeController.getRecipesByUser);
router.post('/', RecipeController.createRecipe);
router.post('/share/whatsapp', RecipeController.shareRecipeOnWhatsApp);
router.get('/:id', RecipeController.getRecipeById);
router.post('/:id/like', checkAuthenticated,RecipeController.likeRecipe);
router.post('/:id/comment', RecipeController.addCommentToRecipe);
router.put('/:id', RecipeController.updateRecipe);
router.delete('/:id', RecipeController.deleteRecipe);

module.exports = router;