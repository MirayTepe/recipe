const User = require('../models/user');

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};
exports.getUserById = async (userId) => {
    return await User.findById(userId);
};
exports.getUserByUserName = async (userName) => {
    return await User.findOne({ userName });
};
exports.getUserByEmail = async (email) => {
    return await User.findOne({ email });
};
exports.login = async (email, password) => {
    const user = await User.findOne({ email, password });
    return user;
};
exports.getUserAll = async () => {
    return await User.find();
};
exports.updateUser = async (userId, userData) => {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
};
exports.likeRecipe = async (userId, recipeId) => {
    const user = await User.findById(userId);
    if (!user.likedRecipes.includes(recipeId)) {
      user.likedRecipes.push(recipeId);
      await user.save();
    }
    return user;
  };
  
  exports.saveRecipe = async (userId, recipeId) => {
    const user = await User.findById(userId);
    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
    }
    return user;
  };

exports.getUserById = async (userId) => {
    return await User.findById(userId).populate('createdRecipes'); 
  };

  

