// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, addUser } = require('../controllers/userController');

// Get all users
router.get('/', getUsers);

// Add a new user
router.post('/add', addUser);

module.exports = router;
