import apiClient from './apiClient';

const createRecipe = async (recipeData) => {
    try {
        const response = await apiClient.post('/recipes', recipeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getRecipeById = async (recipeId) => {
    try {
        const response = await apiClient.get(`/recipes/${recipeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getAllRecipes = async () => {
    try {
        const response = await apiClient.get('/recipes');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateRecipe = async (recipeId, recipeData) => {
    try {
        const response = await apiClient.put(`/recipes/${recipeId}`, recipeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteRecipe = async (recipeId) => {
    try {
        await apiClient.delete(`/recipes/${recipeId}`);
    } catch (error) {
        throw error;
    }
};

const likeRecipe = async (recipeId) => {
    try {
        await apiClient.post(`/recipes/${recipeId}/like`);
    } catch (error) {
        throw error;
    }
};

const addCommentToRecipe = async (recipeId, commentData) => {
    try {
        const response = await apiClient.post(`/recipes/${recipeId}/comment`, commentData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getRecipesByCategory = async (categoryId) => {
    try {
        const response = await apiClient.get(`/recipes/recipebycategory?category=${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const searchRecipes = async (query) => {
    try {
        const response = await apiClient.get(`/recipes/search?query=${query}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const shareRecipeOnWhatsApp = async (recipeId) => {
    try {
        const response = await apiClient.post('/recipes/share/whatsapp', { recipeId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    createRecipe,
    getRecipeById,
    getAllRecipes,
    updateRecipe,
    deleteRecipe,
    likeRecipe,
    addCommentToRecipe,
    getRecipesByCategory,
    searchRecipes,
    shareRecipeOnWhatsApp
};
