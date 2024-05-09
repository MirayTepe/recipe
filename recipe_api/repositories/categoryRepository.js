const Category = require('../models/category');

exports.createCategory = async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
};

exports.getCategoryById = async (categoryId) => {
    return await Category.findById(categoryId);
};

exports.updateCategory = async (categoryId, newData) => {
    return await Category.findByIdAndUpdate(categoryId, newData, { new: true });
};

exports.deleteCategory = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
};
