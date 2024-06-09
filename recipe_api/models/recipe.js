const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  photo_url: {
    type: String,
    required: true
  },
  photosArray: {
    type: [String],
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  ingredients: [{
    ingredientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true
    },
    quantity: String
  }],
  description: {
    type: String,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Kolay', 'Orta', 'Zor'] // Belirli değerleri kabul etmesi için
  },
  servings: {
    type: Number
  },
  video_url: {
    type: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

