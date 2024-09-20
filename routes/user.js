const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import User model
const bcrypt = require('bcryptjs');

// POST /users/add - Add a new user
router.post('/add', async (req, res) => {
    const { name, username, password, phonenumber, email, role } = req.body;

    try {
        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            phonenumber,
            email,
            role
        });

        // Save the user to the database
        await newUser.save();

        // Send success message only (no user details)
        res.status(201).json({ success: 'User added successfully' });
    } catch (error) {
        // Send error message
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
