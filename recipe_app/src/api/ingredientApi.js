import apiClient from './apiClient';

// Yeni bir malzeme oluşturma
const createIngredient = async (ingredientData) => {
    try {
        const response = await apiClient.post('/ingredients', ingredientData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Belirli bir malzemeyi ID ile getirme
const getIngredientById = async (ingredientId) => {
    try {
        const response = await apiClient.get(`/ingredients/${ingredientId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Tüm malzemeleri getirme
const getAllIngredients = async () => {
    try {
        const response = await apiClient.get('/ingredients');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Bir malzemeyi güncelleme
const updateIngredient = async (ingredientId, ingredientData) => {
    try {
        const response = await apiClient.put(`/ingredients/${ingredientId}`, ingredientData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Bir malzemeyi silme
const deleteIngredient = async (ingredientId) => {
    try {
        await apiClient.delete(`/ingredients/${ingredientId}`);
    } catch (error) {
        throw error;
    }
};

export { createIngredient, getIngredientById, getAllIngredients, updateIngredient, deleteIngredient };
