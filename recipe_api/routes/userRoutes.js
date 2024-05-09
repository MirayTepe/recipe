const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/:userId', userController.getUserById);
router.get('/email/:email', userController.getUserByEmail);

module.exports = router;
