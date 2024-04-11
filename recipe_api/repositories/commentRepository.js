const Comment = require('../models/comment');

exports.createComment = async (commentData) => {
    const comment = new Comment(commentData);
    return await comment.save();
};

exports.getCommentById = async (commentId) => {
    return await Comment.findById(commentId).populate('createdBy');
};
