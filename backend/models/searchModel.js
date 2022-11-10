const mongoose = require("mongoose");

const searchSchema = mongoose.Schema(
  {
    text: {
      type: Array,
      required: [true, "Please atleast search using one ingredient"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Search', searchSchema)