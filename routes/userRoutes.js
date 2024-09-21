const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust according to your User model path

// Get users
router.get('/', async (req, res) => {
    const messages = {
        success: req.flash('success_msg'),
        error: req.flash('error_msg')
    };

    try {
        const users = await User.find(); // Fetch users from the database
        res.render('users', { messages, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        req.flash('error_msg', 'Failed to fetch users.');
        res.redirect('/users');
    }
});

module.exports = router;
