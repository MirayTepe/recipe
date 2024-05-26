const User = require('../models/user');

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.getUserById = async (userId) => {
    return await User.findById(userId);
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


