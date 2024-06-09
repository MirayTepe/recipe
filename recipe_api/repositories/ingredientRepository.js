const Ingredient = require('../models/ingredient');

exports.createIngredient = async (ingredientData) => {
    const ingredient = new Ingredient(ingredientData);
    return await ingredient.save();
};

exports.getIngredientById = async (ingredientId) => {
    return await Ingredient.findById(ingredientId);
};

exports.updateIngredient = async (ingredientId, newData) => {
    return await Ingredient.findByIdAndUpdate(ingredientId, newData, { new: true });
};

exports.deleteIngredient = async (ingredientId) => {
    return await Ingredient.findByIdAndDelete(ingredientId);
};
exports.getIngredientAll = async () => {
    return await Ingredient.find();
};
