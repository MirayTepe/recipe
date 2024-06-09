// CommentForm.js
import React, { useState } from 'react';
import { createComment } from '../api/commentApi';

const CommentForm = ({ onCommentCreated }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            content
        };
        const createdComment = await createComment(newComment);
        onCommentCreated(createdComment);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default CommentForm;
