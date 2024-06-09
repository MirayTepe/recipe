const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // İstek başlığından token al
    const token = req.header('Authorization');

    // Token kontrolü
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    try {
        // Token doğrulama
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ message: "Token is not valid" });
    }
};
