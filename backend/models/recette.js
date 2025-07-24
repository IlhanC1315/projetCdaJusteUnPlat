const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
  recipeImage: { type: String, required: true },
  recipeName: { type: String, required: true },
  prep_time: { type: Number, required: true },
  cook_time: { type: Number, required: true },
  difficulty: { type: mongoose.Schema.Types.ObjectId, ref:'Difficulty'},
  servings: { type: Number, required: true },
  estimated_cost: { type: Number, required: true },
  description: { type: String, required: true },
  ingredientEtapes: { type: mongoose.Schema.Types.ObjectId, ref: 'IngredientEtape' },
  prepEtape: { type: mongoose.Schema.Types.ObjectId, ref: 'PrepEtape'},
  chefTips: { type: String },
  nutritionValues: { type: mongoose.Schema.Types.ObjectId, ref: 'nutritionValues'},
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorys' },
  origin: { type: mongoose.Schema.Types.ObjectId, ref: 'Origins'}
}, { timestamps: true });

module.exports = mongoose.model('Recette', recetteSchema)