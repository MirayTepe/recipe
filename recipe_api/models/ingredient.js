const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  calories: {
    type: Number
  },
  nutrients: {
    type: Map, 
    of: Number
  },
  photo_url: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);