const ingredientRepository = require('../repositories/ingredientRepository');

exports.createIngredient = async (req, res) => {
    const ingredientData = req.body;
    const ingredient = await ingredientRepository.createIngredient(ingredientData);
    res.status(201).json(ingredient);
};

exports.getIngredientById = async (req, res) => {
    const { id } = req.params;
    const ingredient = await ingredientRepository.getIngredientById(id);
    res.status(200).json(ingredient);
};

exports.updateIngredient = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const updatedIngredient = await ingredientRepository.updateIngredient(id, newData);
    res.status(200).json(updatedIngredient);
};

exports.deleteIngredient = async (req, res) => {
    const { id } = req.params;
    await ingredientRepository.deleteIngredient(id);
    res.status(204).end();
};
