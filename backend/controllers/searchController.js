const asyncHandler = require("express-async-handler");
const Search = require("../models/searchModel");

// @desc    Get Search Results
// @route   GET /api/search
// @access  Private
const getSearchResults = asyncHandler(async (req, res) => {
  const results = await Search.find();

  res.status(200).json({ results });
});

const setSearch = asyncHandler(async (req, res) => {
  let ingredientArray = [];

  req.body.payload.map((ingredient) => {
    ingredientArray.push(ingredient.value);
  });

  let payload = ingredientArray;
  console.log(payload);
  let search = await Search.find({recipe: {$elemMatch: { $in: [...payload]}}}).exec()
  console.log(search)
  res.send({payload: search})
});

module.exports = {
  getSearchResults,
  setSearch,
};
