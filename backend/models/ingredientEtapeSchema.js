const mongoose = require('mongoose');

const ingredientEtapeSchema = new mongoose.Schema({
  nameEtape: { type: String, required: true },
  ingredient: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
});

module.exports = mongoose.model('IngredientEtape', ingredientEtapeSchema)