const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({ message: 'Validation Error', errors });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({ message: 'Duplicate field value entered', error: err.keyValue });
    }

    // JWT token error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // JWT token expired error
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
    }

    // Unauthorized error
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // General server error
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = globalErrorHandler;
