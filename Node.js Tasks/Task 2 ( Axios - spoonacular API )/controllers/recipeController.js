const axios = require('axios');
const BASE_URL = 'https://api.spoonacular.com/recipes';

class RecipeController {
  static async createRecipe(apiKey, data) {
    try {      
      const response = await axios.post(`${BASE_URL}/complexSearch`, {
        apiKey,
        data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllRecipes(apiKey) {
    try {
      const response = await axios.get(`${BASE_URL}/complexSearch`, {
        params: {
          apiKey,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getSingleRecipe(apiKey, recipeId) {
    try {
      const response = await axios.get(`${BASE_URL}/${recipeId}/information`, {
        params: {
          apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  static async updateRecipe(apiKey, recipeId, data) {
    try {
      const response = await axios.put(`${BASE_URL}/${recipeId}`, data, {
        params: {
          apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteRecipe(apiKey, recipeId) {
    try {
      const response = await axios.delete(`${BASE_URL}/${recipeId}`, {
        params: {
          apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RecipeController;

