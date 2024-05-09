const commentRepository = require('../repositories/commentRepository');

exports.createComment = async (req, res, next) => {
    const comment = await commentRepository.createComment(req.body);
    res.status(201).json(comment);
};

exports.getCommentById = async (req, res, next) => {
    const comment = await commentRepository.getCommentById(req.params.commentId);
    res.status(200).json(comment);
};
