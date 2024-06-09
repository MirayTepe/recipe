const userRepository = require('../repositories/userRepository');
const { generateAccessToken, generateRefreshToken, hashPassword } = require('../security/helper');
const bcrypt = require('bcrypt');
const recipeRepository = require('../repositories/recipeRepository');

exports.createUser = async (req, res, next) => {
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await userRepository.createUser(req.body);
    res.status(201).json(user);
};

exports.getUserById = async (req, res, next) => {
    const user = await userRepository.getUserById(req.params.userId);
    res.status(200).json(user);
};

exports.getUserByEmail = async (req, res, next) => {
    const user = await userRepository.getUserByEmail(req.params.email);
    res.status(200).json(user);
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(200).json({ userId: user.id, accessToken, refreshToken });
    } catch (error) {
        // Hata yakalandığında buraya düşecek
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
};


exports.updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { email, userName, password } = req.body;
    const existingUserByEmail = await userRepository.getUserByEmail(email);
    if (existingUserByEmail && existingUserByEmail._id.toString() !== userId) {
        return res.status(400).json({ message: "This email is already in use." });
    }
    const existingUserByUserName = await userRepository.getUserByUserName(userName);
    if (existingUserByUserName && existingUserByUserName._id.toString() !== userId) {
        return res.status(400).json({ message: "This username is already in use." });
    }

    if (password) {
        const hashedPassword = await hashPassword(password);
        req.body.password = hashedPassword;
    }

    const updatedUser = await userRepository.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
};

exports.getUserAll = async (req, res, next) => {
    const users = await userRepository.getUserAll();
    res.status(200).json(users);
};

exports.likeRecipe = async (req, res, next) => {
    try {
        const { recipeId, userId } = req.body;
        
        const user = await userRepository.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await userRepository.likeRecipe(userId, recipeId);
        res.status(200).json({ message: 'Recipe liked successfully' });
    } catch (error) {
        console.error("Like recipe error:", error);
        next(error);
    }
};



exports.saveRecipe = async (req, res, next) => {
   
        const recipeId = req.params.recipeId;
        await userRepository.saveRecipe(req.user.id, recipeId);
        res.status(200).json({ message: 'Recipe saved successfully' });

};

// Tarifi kullanıcının favorilerine kaydetme
exports.saveRecipeToUserFavorites = async (req, res, next) => {
    const { userId, recipeId } = req.body;
    const user = await userRepository.getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.savedRecipes.push(recipeId);
    await user.save();
    res.status(200).json({ message: "Recipe saved to favorites successfully", user });
};

// Kaydedilmiş tarifleri alma
exports.getSavedRecipes = async (req, res, next) => {
    const { userId } = req.params;
    const user = await userRepository.getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const savedRecipes = await recipeRepository.getRecipesByIds(user.savedRecipes);
    res.status(200).json(savedRecipes);
};


exports.getUserCreatedRecipes = async (req, res, next) => {
  try {
    // İstekin token bilgisini içerdiğinden ve doğru bir şekilde işlendiğinden emin ol
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // Kullanıcının kimliğini al
    const user = await userRepository.getUserById(userId); // Kullanıcıyı kimliğine göre al
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRecipes = user.createdRecipes; // Kullanıcının oluşturduğu tarifleri al
    res.status(200).json(userRecipes); // Tarifleri döndür
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    res.status(500).json({ message: "Internal Server Error" }); // Sunucu hatası durumunda hata mesajı döndür
  }
};