const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import User model
const bcrypt = require('bcryptjs');

// GET /users/signup - Display the signup form
router.get('/signup', (req, res) => {
    res.render('signup'); // Render a signup view (create signup.ejs in views)
});

// POST /users/signup - Handle signup form submission
router.post('/signup', async (req, res) => {
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

        // Redirect or respond with a success message
        res.status(201).json({ success: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /users - Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

module.exports = router;
