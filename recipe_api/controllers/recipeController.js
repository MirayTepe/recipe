const recipeRepository = require('../repositories/recipeRepository');
const commentRepository = require('../repositories/commentRepository');

exports.createRecipe = async (req, res, next) => {
    try {
        const recipe = await recipeRepository.createRecipe(req.body);
        res.status(201).json(recipe);
    } catch (error) {
        next(error);
    }
};

exports.getRecipeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await recipeRepository.getRecipeById(id);
        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
};

exports.likeRecipe = async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        const userId = req.user._id;
        await recipeRepository.likeRecipe(recipeId, userId);
        res.status(200).send('Recipe liked successfully');
    } catch (error) {
        next(error);
    }
};

exports.addCommentToRecipe = async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        const comment = await commentRepository.createComment(req.body);
        await recipeRepository.addCommentToRecipe(recipeId, comment._id);
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

exports.getRecipeAll = async (req, res, next) => {
    try {
        const recipes = await recipeRepository.getRecipeAll();
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};

exports.getRecipesByCategory = async (req, res, next) => {
    try {
        const { category } = req.query;
        const recipes = await recipeRepository.getRecipesByCategory(category);
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};

exports.updateRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedRecipe = await recipeRepository.updateRecipe(id, req.body);
        res.status(200).json(updatedRecipe);
    } catch (error) {
        next(error);
    }
};

exports.deleteRecipe = async (req, res, next) => {
    try {
        const { id } = req.params;
        await recipeRepository.deleteRecipe(id);
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        next(error);
    }
};

exports.searchRecipes = async (req, res, next) => {
    try {
        const { query } = req.query;
        const recipes = await recipeRepository.searchRecipes(query);
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};
exports.getRecipesByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId; // userId parametresini al
        const recipes = await recipeRepository.getRecipesByUser(userId);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes by user:', error);
        res.status(500).json({ message: 'Failed to fetch recipes by user' });
    }
};


exports.shareRecipeOnWhatsApp = async (req, res, next) => {
    try {
        const { recipeId } = req.body;
        const shareLink = generateRecipeShareLink(recipeId);
        const whatsappShareUrl = generateWhatsAppShareUrl(shareLink);
        res.status(200).json({ message: 'Recipe WhatsApp share link generated successfully', whatsappShareUrl });
    } catch (error) {
        next(error);
    }
};

const generateRecipeShareLink = (recipeId) => {
    const baseUrl = 'myapp://recipe';
    return `${baseUrl}/${recipeId}`;
};

const generateWhatsAppShareUrl = (shareLink) => {
    const message = encodeURIComponent(`Check out this recipe: ${shareLink}`);
    return `https://api.whatsapp.com/send?text=${message}`;
};
// Existing imports and functions...

exports.getRecipesByIngredient = async (req, res) => {
    const { ingredientId } = req.params;
    try {
        const recipes = await Recipe.getRecipesByIngredient(ingredientId);
        res.json(recipes);
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving recipes by ingredient",
            error: error.message
        });
    }
};

