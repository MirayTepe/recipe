const userRepository = require('../repositories/userRepository');

exports.createUser = async (req, res, next) => {
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
    const { email, password } = req.body;
   
    const user = await userRepository.login(email, password);
    if (user) {
        res.status(200).json(user);     
    }
   res.status(401).json({ message: "Invalid credentials" });
};
