const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  ingredientName: { type: String, required: true },
  measurementUnit: { type: String },
  quantity: { type: String, required: true }
}, { _id: false });

const ingredientEtapeSchema = new mongoose.Schema({
  nameEtape: { type: String, required: true },
  ingredient: [ingredientSchema]
}, { _id: false });

const prepEtapeSchema = new mongoose.Schema({
  namePrepEtape: { type: String, required: true },
  numberEtape: { type: Number, required: true },
  instruction: { type: String, required: true }
}, { _id: false });

const nutritionValueSchema = new mongoose.Schema({
  nameValues: { type: String, },
  values: { type: String, }
}, { _id: false });

const filterCategorySchema = new mongoose.Schema({
  prep_time_filter: [String],
  cook_time_filter: [String],
  difficulty_filter: [String]
}, { _id: false });

const recetteSchema = new mongoose.Schema({
  recipeImage: { type: String, required: true },
  recipeName: { type: String, required: true },
  prep_time: { type: Number, required: true },
  cook_time: { type: Number, required: true },
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

// type categorys = {
//     entrées : string
//     platsPrincipaux : String
//     accompagnements: string
//     dessert: String
//     snack_fastFood: String
//     soupe_veloutes: String
//     salade: String
//     petitDej_brunch: String
//     aperitif: String
//     boisson: String
//     sauce: String
//     pays: String
// };

module.exports = mongoose.model('Recette', recetteSchema)