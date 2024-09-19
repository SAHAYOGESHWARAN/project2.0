// E:\project _2.0\routes\userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController'); // Ensure the path is correct

// Define routes
router.get('/users', UserController.getUsers); // Adjust as needed
router.post('/users/add', UserController.addUser); // Adjust as needed

module.exports = router;
