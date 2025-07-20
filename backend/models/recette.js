const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  ingredientName: { type: String, required: true },
  valuesIngredient: { type: String, required: true },
  quantity: { type: String, required: true }
}, { _id: false });

const ingredientEtapeSchema = new mongoose.Schema({
  nameEtape: { type: String, required: true },
  ingredient: [ingredientSchema]
}, { _id: false });

const prepEtapeSchema = new mongoose.Schema({
  namePrepEtape: { type: String, required: true },
  numberEtape: { type: Number, required: true },
  prep: { type: String, required: true }
}, { _id: false });

const nutritionValueSchema = new mongoose.Schema({
  nameValues: { type: String, required: true },
  values: { type: String, required: true }
}, { _id: false });

const filterCategorySchema = new mongoose.Schema({
  prep_time_filter: [String],
  cook_time_filter: [String],
  difficulty_filter: [String]
}, { _id: false });

const recetteSchema = new mongoose.Schema({
  recipeImage: { type: String, required: true },
  recipeName: { type: String, required: true },
  prep_time: { type: String, required: true },
  cook_time: { type: String, required: true },
  servings: { type: Number, required: true },
  estimated_cost: { type: Number, required: true },
  description: { type: String, required: true },
  ingredientEtapes: [ingredientEtapeSchema],
  prepEtape: [prepEtapeSchema],
  chefTips: { type: String },
  nutritionValues: [nutritionValueSchema],
  category: { type: String, required: true },
  filterCategory: [filterCategorySchema],
  origin: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Recette', recetteSchema)