const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/ingredient', ingredientRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
