const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');

exports.register = async (req, res) => {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserRepository.createUser({
        userName,
        email,
        password: hashedPassword
    });

    res.status(201).json(newUser);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, userName: user.userName, email: user.email } });
};
