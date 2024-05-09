const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  
    categoryId: {
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
    time: {
        type: String,
        required: true
    },
    ingredients: {
        type: [ingredientSchema], // ingredients şemasını kullanarak bir dizi oluşturuyoruz
        required: true
    },
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
    }
});
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports=Recipe;