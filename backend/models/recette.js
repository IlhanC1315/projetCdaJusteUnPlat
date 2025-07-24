const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
  recipeImage: { type: String, required: true },
  recipeName: { type: String, required: true },
  prep_time: { type: Number, required: true },
  cook_time: { type: Number, required: true },
  difficulty: { type: mongoose.Schema.Types.ObjectId, ref:'Difficulty' },
  servings: { type: Number },
  estimated_cost: { type: mongoose.Schema.Types.ObjectId, ref:'EstimatedCost' },
  occasion: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Occasion' }],
  season: [{ type: mongoose.Schema.Types.ObjectId, ref:'Season' }],
  mainIngredient: [{ type: mongoose.Schema.Types.ObjectId, ref:'MainIngredient' }],
  cookingMethod: [{ type: mongoose.Schema.Types.ObjectId, ref:'CookingMethod' }],
  required_tools: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Tool' }],
  description: { type: String, required: true },
  ingredientEtapes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'IngredientEtape' }],
  prepEtape: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PrepEtape' }],
  chefTips: { type: String },
  nutritionValues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'nutritionValues' }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorys' },
  diet: { type: mongoose.Schema.Types.ObjectId, ref:'Diet' },
  origin: { type: mongoose.Schema.Types.ObjectId, ref: 'Origins' }
}, { timestamps: true });

module.exports = mongoose.model('Recette', recetteSchema);