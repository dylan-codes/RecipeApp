const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema(
  {
    ingredient: {
      type: String,
      required: [true, "Please add a text value (Ingredient Name)."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ingredient', ingredientSchema)