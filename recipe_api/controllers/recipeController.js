const RecipeRepository = require('../repositories/recipeRepository');

exports.createRecipe = async (req, res) => {
    const { title, description, image, video, ingredients, instructions } = req.body;
    const createdBy = req.user.id;

    const newRecipe = await RecipeRepository.createRecipe({
        title,
        description,
        image,
        video,
        ingredients,
        instructions,
        createdBy
    });

    res.status(201).json(newRecipe);
};

exports.getRecipeById = async (req, res) => {
    const recipe = await RecipeRepository.getRecipeById(req.params.id);
    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
};

exports.likeRecipe = async (req, res) => {
    const userId = req.user.id;
    await RecipeRepository.likeRecipe(req.params.id, userId);
    
    res.status(200).json({ message: 'Recipe liked' });
};

exports.addCommentToRecipe = async (req, res) => {
    const { content } = req.body;
    const createdBy = req.user.id;

    const newComment = await CommentRepository.createComment({ content, createdBy, recipe: req.params.id });
    await RecipeRepository.addCommentToRecipe(req.params.id, newComment._id);

    res.status(201).json(newComment);
};
