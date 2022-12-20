const express = require('express')
const router = express.Router()
const { getUserRecipes, getRecipesAll, setRecipeCriteria, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController')
const {protect} = require('../middleware/authMiddleware')

//getUserRecipes or getRecipesAll
router.route("/").get(protect, getUserRecipes).post(protect, setRecipeCriteria)
router.route("/create").post(protect, createRecipe)
router.route("/:id").put(protect, updateRecipe).delete(protect, deleteRecipe)

module.exports = router