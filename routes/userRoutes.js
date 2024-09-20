const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.post('/signup', async (req, res) => {
    const { name, username, password, phonenumber, email, role = 'User' } = req.body; // Default role to 'User'

    try {
        // Validate required fields
        if (!name || !username || !password || !phonenumber || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        // Create a new user
        const newUser = new User({ name, username, password, phonenumber, email, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: "Server error", details: error.message }); // Provide more error details
    }
});

module.exports = router;
