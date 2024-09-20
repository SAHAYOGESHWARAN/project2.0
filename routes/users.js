const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model set up for MongoDB

// Add User
router.post('/add', async (req, res) => {
    try {
        const { name, username, password, phonenumber, email, role } = req.body;

        // Create new user (hash password, validate, etc.)
        const user = new User({
            name,
            username,
            password, // You might want to hash this before saving
            phonenumber,
            email,
            role
        });

        const savedUser = await user.save();
        res.status(201).json({ user: savedUser });
    } catch (err) {
        res.status(500).json({ error: 'Error adding user' });
    }
});

module.exports = router;
