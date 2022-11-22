const express = require('express')
const router = express.Router()
const { getRecipesAll, setRecipeCriteria, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController')
const {protect} = require('../middleware/authMiddleware')


router.route("/").get(protect, getRecipesAll).post(protect, setRecipeCriteria)
router.route("/create").post(protect, createRecipe)
router.route("/:id").put(protect, updateRecipe).delete(protect, deleteRecipe)

module.exports = router