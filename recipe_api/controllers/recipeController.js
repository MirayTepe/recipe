const Recipe = require('../models/recipe');
const recipeRepository = require('../repositories/recipeRepository');

exports.createRecipe = async (req, res, next) => {
    const recipe = await recipeRepository.createRecipe(req.body);
    res.status(201).json(recipe);
};

exports.getRecipeById = async (req, res, next) => {
    const recipe = await recipeRepository.getRecipeById(req.params.recipeId);
    res.status(200).json(recipe);
};

exports.likeRecipe = async (req, res, next) => {
    await recipeRepository.likeRecipe(req.params.recipeId, req.user.id);
    res.status(200).send('Recipe liked successfully');
};

exports.addCommentToRecipe = async (req, res, next) => {
    const comment = await commentRepository.createComment(req.body);
    await recipeRepository.addCommentToRecipe(req.params.recipeId, comment._id);
    res.status(201).json(comment);
};

exports.getRecipeAll = async (req, res, next) => {
    const recipes = await recipeRepository.getRecipeAll();
    res.status(200).json(recipes);
};
