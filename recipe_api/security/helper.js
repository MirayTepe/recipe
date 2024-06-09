const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Şifre hashleme
const hashPassword = async (password) => {
    const saltRounds = 12; // Bcrypt için gerekli tuz sayısı
    return await bcrypt.hash(password, saltRounds);
};

// Erişim jetonu oluşturma
const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email, ...user }, process.env.JWT_SECRET, { expiresIn: "1w" });
};
// Yenileme jetonu oluşturma
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email, ...user }, process.env.JWT_SECRET, { expiresIn: "1w" });
};
module.exports = {
    hashPassword,
    generateAccessToken,
    generateRefreshToken,
};