const express = require('express');
const router = express.Router();
const { getAddUser, addUser } = require('../controllers/userController');

// Route to render the add user form
router.get('/add', getAddUser);

// Route to handle form submission
router.post('/add', addUser);

module.exports = router;
