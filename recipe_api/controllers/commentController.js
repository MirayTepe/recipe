const commentRepository = require('../repositories/commentRepository');

exports.createComment = async (req, res, next) => {
    try {
        const { content, createdBy, recipe } = req.body;
        // Gerekli alanların sağlandığını kontrol et
        if (!content || !createdBy || !recipe) {
            return res.status(400).json({ message: "content, createdBy, and recipe are required fields" });
        }
        const commentData = {
            content,
            createdBy,
            recipe,
        };
        const comment = await commentRepository.createComment(commentData);
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        next(error);
    }
};

exports.getCommentById = async (req, res, next) => {
    const comment = await commentRepository.getCommentById(req.params.commentId);
    res.status(200).json(comment);
};
exports.getCommentsByRecipeId = async (req, res, next) => {
    try {
        const comments = await commentRepository.getCommentsByRecipeId(req.params.recipeId);
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error getting comments by recipe id:", error);
        next(error);
    }
};
