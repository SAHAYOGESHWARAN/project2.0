const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import User model
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// POST /users/add - Add a new user with validation and token generation
router.post('/add', [
    // Validate input fields
    body('name').not().isEmpty().withMessage('Name is required'),
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phonenumber').isMobilePhone().withMessage('Phone number must be valid'),
    body('role').isIn(['Admin', 'User']).withMessage('Role must be either Admin or User')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, password, phonenumber, email, role } = req.body;

    try {
        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or Email already exists' });
        }

        // Hash the password with a salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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

        // Generate a JWT token
        const payload = {
            user: {
                id: newUser._id,
                role: newUser.role
            }
        };

        const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

        res.status(201).json({ success: 'User added successfully', token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
