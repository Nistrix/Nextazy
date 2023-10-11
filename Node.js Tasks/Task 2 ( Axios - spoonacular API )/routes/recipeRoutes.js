const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

const apiKey = '199bc0fe28bd424aafa3c72dde535cee';

// Create a recipe
router.post('/recipes', async (req, res) => {
  try {
    const { data } = req.body;
    const createdRecipe = await recipeController.createRecipe(apiKey, data);
    return res.status(200).json({ status: 'Success', data: createdRecipe });
  } catch (error) {
    console.error('Error:', error);
    return res.status(400).json({ error: 'Internal Server Error' });
  }
});

// Get all recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipesList = await recipeController.getAllRecipes(apiKey);
   return res.status(200).json({ status: 'success', data: recipesList });
  } catch (error) {
    console.error('Error:', error);
   return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a recipe by ID
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipeController.getSingleRecipe(apiKey, recipeId);
   return res.status(200).json({ status: 'Success', data: recipe });
  } catch (error) {
    console.error('Error:', error);
   return res.status(400).json({ error: 'Internal Server Error' });
  }
});

// Update a recipe by ID
router.put('/recipes/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { data } = req.body;
    const updatedRecipe = await recipeController.updateRecipe(apiKey, recipeId, data);
   return res.status(200).json({ status: 'Success', data: updatedRecipe });
  } catch (error) {
    console.error('Error:', error);
   return res.status(400).json({ error: 'Internal Server Error' });
  }
});

// Delete a recipe by ID
router.delete('/recipes/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    await recipeController.deleteRecipe(apiKey, recipeId);
   return res.status(200).json({ status: 'Success', message: 'Recipe deleted Successfully' });
  } catch (error) {
    console.error('Error:', error);
   return res.status(400).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;