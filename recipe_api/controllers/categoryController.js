const categoryRepository = require('../repositories/categoryRepository');

exports.createCategory = async (req, res) => {
    const categoryData = req.body;
    const category = await categoryRepository.createCategory(categoryData);
    res.status(201).json(category);
};

exports.getCategoryById = async (req, res) => {
    const { id } = req.params.id;
    const category = await categoryRepository.getCategoryById(id);
    res.status(200).json(category);
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params.id;
    const newData = req.body;
    const updatedCategory = await categoryRepository.updateCategory(id, newData);
    res.status(200).json(updatedCategory);
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    await categoryRepository.deleteCategory(id);
    res.status(204).end();
};
exports.getCategoryAll = async (req, res) => {
    const categories = await categoryRepository.getCategoryAll();
    res.status(200).json(categories);
};