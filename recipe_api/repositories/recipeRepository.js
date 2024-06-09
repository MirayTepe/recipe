const Recipe = require('../models/recipe');

exports.createRecipe = async (recipeData) => {
    const recipe = new Recipe(recipeData);
    return await recipe.save();
};

exports.getRecipeById = async (recipeId) => {
    return await Recipe.findById(recipeId)
        .populate('category')
        .populate('ingredients.ingredientId')
        .populate('createdBy')
        .populate({
            path: 'comments',
            populate: {
                path: 'createdBy'
            },
            options: { strictPopulate: false }
        });
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
    return await Recipe.find()
        .populate('category')
        .populate('ingredients.ingredientId')
        .populate('createdBy')
        .populate({
            path: 'comments',
            populate: {
                path: 'createdBy'
            }
        });
};

exports.getRecipesByCategory = async (categoryId) => {
    return await Recipe.find({ category: categoryId })
        .populate('category')
        .populate('ingredients.ingredientId')
        .populate('createdBy')
        .populate({
            path: 'comments',
            populate: {
                path: 'createdBy'
            }
        });
};

exports.updateRecipe = async (recipeId, updatedRecipeData) => {
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedRecipeData, { new: true });
    return updatedRecipe;
};

exports.deleteRecipe = async (recipeId) => {
    await Recipe.findByIdAndDelete(recipeId);
    return { message: 'Recipe deleted successfully' };
};

exports.searchRecipes = async (query) => {
    const recipes = await Recipe.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        },
        {
            $lookup: {
                from: 'ingredients',
                localField: 'ingredients.ingredientId',
                foreignField: '_id',
                as: 'ingredients'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy'
            }
        },
        {
            $unwind: '$createdBy'
        },
        {
            $lookup: {
                from: 'comments',
                localField: 'comments',
                foreignField: '_id',
                as: 'comments'
            }
        },
        {
            $unwind: '$ingredients'
        },
        {
            $match: {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { 'ingredients.name': { $regex: query, $options: 'i' } }
                ]
            }
        },
        {
            $group: {
                _id: '$_id',
                doc: { $first: '$$ROOT' }
            }
        },
        {
            $replaceRoot: { newRoot: '$doc' }
        },
        {
            $project: {
                title: 1,
                description: 1,
                category: 1,
                ingredients: 1,
                createdBy: {
                    _id: 1,
                    userName: 1,
                    fullName: 1,
                    profilePicture: 1
                },
                comments: 1,
                cookingTime: 1,
                photo_url: 1,
                photosArray: 1,
                video_url: 1,
                difficulty: 1,
                servings: 1,
                likes: 1,
                createdAt: 1
            }
        }
    ]);

    return recipes;
};

exports.getRecipesByIds = async (recipeIds) => {
    return Recipe.find({ '_id': { $in: recipeIds } });
};

exports.getRecipesByUser = async (userId) => {
    return Recipe.find({ createdBy: userId })
        .populate('category')
        .populate('ingredients.ingredientId')
        .populate('createdBy')
        .populate({
            path: 'comments',
            populate: {
                path: 'createdBy'
            }
        });
};
exports.getRecipesByIngredient = async (ingredientId) => {
    try {
        const recipes = await Recipe.aggregate([
            {
                $unwind: '$ingredients' // Flatten the ingredients array to process each ingredient
            },
            {
                $match: {
                    'ingredients.ingredientId': mongoose.Types.ObjectId(ingredientId) // Filter recipes by specific ingredient ID
                }
            },
            {
                $lookup: {
                    from: 'ingredients', // Assuming your ingredients collection is named 'ingredients'
                    localField: 'ingredients.ingredientId',
                    foreignField: '_id',
                    as: 'ingredientDetails' // Output array containing the joined documents
                }
            },
            {
                $unwind: '$ingredientDetails' // Flatten the result to make processing easier
            },
            {
                $group: { // Group data back by recipe
                    _id: '$_id',
                    title: { $first: '$title' },
                    photo_url: { $first: '$photo_url' },
                    description: { $first: '$description' },
                    ingredients: { $push: '$ingredientDetails' }, // Collect all ingredients details again if needed
                    cookingTime: { $first: '$cookingTime' },
                    createdBy: { $first: '$createdBy' },
                    difficulty: { $first: '$difficulty' },
                    servings: { $first: '$servings' },
                    likes: { $first: '$likes' }
                }
            },
            {
                $lookup: { // Optional: Populate other fields like createdBy, category etc.
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'createdByDetails'
                }
            },
            {
                $unwind: '$createdByDetails' // Unwind the createdBy details if needed
            },
            {
                $addFields: { // Add fields to adjust what information is returned or format it
                    createdBy: {
                        userName: '$createdByDetails.userName',
                        profilePicture: '$createdByDetails.profilePicture'
                    }
                }
            },
            {
                $project: { // Define the fields to actually be returned
                    _id: 1,
                    title: 1,
                    photo_url: 1,
                    description: 1,
                    ingredients: 1,
                    cookingTime: 1,
                    createdBy: 1,
                    difficulty: 1,
                    servings: 1,
                    likes: 1
                }
            }
        ]);

        return recipes;
    } catch (error) {
        console.error('Failed to fetch recipes by ingredient:', error);
        throw error;
    }
};

