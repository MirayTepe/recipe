import apiClient from './apiClient';

// Yeni bir yorum oluşturma
const createComment = async (commentData) => {
    try {
        const response = await apiClient.post('/comments', commentData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Belirli bir yorumu ID ile getirme
const getCommentById = async (commentId) => {
    try {
        const response = await apiClient.get(`/comments/${commentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { createComment, getCommentById };
