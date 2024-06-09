// categoryApi.js
import apiClient from './apiClient';

// Yeni bir kategori oluşturma
const createCategory = async (categoryData) => {
    try {
        const response = await apiClient.post('/categories', categoryData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Belirli bir kategoriyi ID ile getirme
const getCategoryById = async (categoryId) => {
    try {
        const response = await apiClient.get(`/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Tüm kategorileri getirme
const getAllCategories = async () => {
    try {
        const response = await apiClient.get('/categories');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Bir kategoriyi ID ile güncelleme
const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await apiClient.put(`/categories/${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Bir kategoriyi ID ile silme
const deleteCategory = async (categoryId) => {
    try {
        await apiClient.delete(`/categories/${categoryId}`);
    } catch (error) {
        throw error;
    }
};

export { createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory };
