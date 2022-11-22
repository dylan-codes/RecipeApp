const asyncHandler = require("express-async-handler");
const { db } = require("../models/ingredientModel");
const Ingredient = require("../models/ingredientModel");

const searchIngredients = asyncHandler(async (req, res) => {
  try {
    if (req.query.ingredient) {
      let results = await Ingredient.aggregate([
        {
          $search: {
            index: "default2",
            compound: {
              must: [
                {
                  text: {
                    query: req.query.ingredient,
                    path: "ingredient",
                    fuzzy: {
                      maxEdits: 2,
                    },
                  },
                },
              ],
            },
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            ingredient: 1,
            _id: 1,
            score: { $meta: "searchScore" },
          },
        },
      ]).exec()

    return res.send(results);
 }
  } catch (err) {
    console.error(err);
    res.send([]);
  }
});

/* const setIngredients = asyncHandler(async (req, res) => {
  try {
    Ingredient.insertMany([
      
    ]);

    const results = await Ingredient.find();
    
    res.status(200).json({ results });
  } catch (e) {
    res
      .status(400)
      .json({ message: "Houston we have majorly fuckered up: " + e });
  }
}); */

module.exports = {
  searchIngredients,
/*   setIngredients, */
};
