const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({


    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' ,
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
        type: String // Kolay, Orta, Zor gibi
    },
  
    servings: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    video_url: {
        type: String
    }
});
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports=Recipe;