const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, "Please add a text value."],
    },
    steps: {
        type: [String],
        required: [true, "Please add the steps of the recipe in Array form."]
    },
    ingredients: {
        type: [Object],
        required: [true, "Please add recipe ingredients in Object -> {name: <strValue>, amount: <strValue>} form."]
    },
    description: {
      type: String,
      required: [true, "Please add a recipe description."]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipe', recipeSchema)