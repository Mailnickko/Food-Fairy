const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  title: String,
  image: String,
  summary: String,
  steps: String,
  missedIngredients: String,
  usedIngredients: String,
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);