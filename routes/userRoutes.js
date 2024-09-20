const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Import User model
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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

        res.status(201).json({ success: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
