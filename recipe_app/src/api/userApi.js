import apiClient from './apiClient';

const userApi = {
  createUser: async (userData) => {
    try {
      const response = await apiClient.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (email, password) => {
    try {
      const response = await apiClient.post('/users/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await apiClient.put(`/users/update/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserByEmail: async (email) => {
    try {
      const response = await apiClient.get(`/users/email/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserCreatedRecipes: async (userId, accessToken) => {
    try {
      const response = await apiClient.get(`/users/created-recipes`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user recipes');
      }

      const data = await response.json();
      return data; // Assuming the response contains an array of recipes
    } catch (error) {
      throw error;
    }
  }
};
export default userApi;
