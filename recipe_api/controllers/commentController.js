const CommentRepository = require('../repositories/commentRepository');

exports.createComment = async (req, res) => {
    const { content } = req.body;
    const createdBy = req.user.id;

    const newComment = await CommentRepository.createComment({ content, createdBy, recipe: req.params.recipeId });

    res.status(201).json(newComment);
};

exports.getCommentById = async (req, res) => {
    const comment = await CommentRepository.getCommentById(req.params.id);
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
};
