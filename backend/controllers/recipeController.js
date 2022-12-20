const asyncHandler = require("express-async-handler");
const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");

// @desc    Get Full Search Result
// @route   GET /api/recipes
// @access  Private
// @NOTE    For DEV purposes only. Not to be used in Prod. To use in dev, change out the route function in recipeRoutes.js
const getRecipesAll = asyncHandler(async (req, res) => {
  const results = await Recipe.find();

  res.status(200).json({ results });
});

// @desc    Get Logged In User's Stored Recipes
// @route   GET /api/recipes
// @access  Private
const getUserRecipes = asyncHandler(async (req, res) => {
  const results = await Recipe.find({"user": { $eq: req.user.id }});

  res.status(200).json({ results });
});

// @desc Search Results Based on Criteria
// @route POST /api/recipes
// @access Private
const setRecipeCriteria = asyncHandler(async (req, res) => {
  let ingredientArray = [];

  req.body.payload.map((ingredient) => {
    ingredientArray.push(new RegExp(ingredient.value, "i"));
  });

  let payload = ingredientArray;

  let search = await Recipe.find({
    $and: [
      {"user": { $eq: req.user.id }},
      {"ingredients.name": { $in: payload }}, // NOTE: You can replace the search with just this line if user doesnt work
    ]
  }).exec();

  res.send({ payload: search });
});


// @desc    Create recipe
// @route   POST /api/recipes/create
// @access  Private
const createRecipe = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.steps || !req.body.ingredients || !req.body.description || !req.body.image) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const recipe = await Recipe.create({
    name: req.body.name,
    steps: req.body.steps,
    ingredients: req.body.ingredients,
    description: req.body.description,
    image: req.body.image,
    user: req.user.id
  });

  res.status(200).json({ recipe });
});

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(400);
    throw new Error("Recipe not found");
  }

  const user = await User.findById(req.user.id);

  // Check for userw
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (recipe.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({updatedRecipe});
});

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {

  const recipe = await Recipe.findById(req.params.id);

  if (!recipe){
    res.status(400)
    throw new Error("Recipe not found")
  }

  const user = await User.findById(req.user.id);

  // Check for userw
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (recipe.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  await recipe.remove()

  res.status(200).json({id: req.params.id});
});

module.exports = {
  getUserRecipes,
  getRecipesAll, // Remove in prod. Only using for testing
  setRecipeCriteria,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
