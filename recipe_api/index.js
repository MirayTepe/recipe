const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const globalErrorHandler = require('./middleware/globalErrorHandler');  // Global error handler import

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/users', userRoutes);
app.use('/recipes' , recipeRoutes);
app.use('/comments', commentRoutes);
app.use('/category', categoryRoutes);
app.use('/ingredient', ingredientRoutes);

// Global Error Handler Middleware
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
