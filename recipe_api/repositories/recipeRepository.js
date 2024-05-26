const Recipe = require('../models/recipe');

exports.createRecipe = async (recipeData) => {
    const recipe = new Recipe(recipeData);
    return await recipe.save();
};

exports.getRecipeById = async (recipeId) => {
    return await Recipe.findById(recipeId).populate('createdBy').populate('comments');
};

exports.likeRecipe = async (recipeId, userId) => {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe.likes.includes(userId)) {
        recipe.likes.push(userId);
        await recipe.save();
    }
};

exports.addCommentToRecipe = async (recipeId, commentId) => {
    const recipe = await Recipe.findById(recipeId);
    recipe.comments.push(commentId);
    await recipe.save();
};
exports.getRecipeAll = async () => {
    return await Recipe.find();
};
