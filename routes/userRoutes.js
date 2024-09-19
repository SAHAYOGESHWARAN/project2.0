// E:\project _2.0\routes\userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController'); 

// Define routes
router.get('/users', UserController.getUsers); 
router.post('/users/add', UserController.addUser); 

module.exports = router;
