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
    type: Map, // veya Object
    of: Number
  },
  photo_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);