const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  ingredientName: { type: String, required: true },
  measurementUnit: { type: String },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Ingredient', ingredientSchema)