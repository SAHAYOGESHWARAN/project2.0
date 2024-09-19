const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path according to your project structure

const { createUser, getSignup } = require('../controllers/signUpController');
const { authUser, getLogin } = require('../controllers/loginController');
const { loadVerify, verifyUser, resendCode } = require('../controllers/verifyController');
const { isLoggedIn, isVerified, notVerified, notLoggedIn } = require('../config/middleware');

// Login route
router.route('/login')
    .all(notLoggedIn)
    .get(getLogin)
    .post(authUser);

// Signup route
router.route('/signup')
    .all(notLoggedIn)
    .get(getSignup)
    .post(createUser);

// Logout route
router.route('/logout')
    .get((req, res) => {
        req.logout(err => {
            if (err) {
                console.error('Logout error:', err);
            }
            res.redirect('/');
        });
    });

// Resend verification code route
router.route('/resend')
    .all(isLoggedIn, notVerified)
    .get(resendCode);

// Verify route
router.route('/verify')
    .all(isLoggedIn, notVerified)
    .get(loadVerify)
    .post(verifyUser);

// Dashboard route
router.route('/dashboard')
    .all(isLoggedIn, isVerified)
    .get((req, res) => {
        res.render('dashboard');
    });

// Fetch all users
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const newUser = new User({ name, email, role });
        await newUser.save();
        req.flash('success_msg', 'User added successfully!');
        res.status(201).json(newUser); // Return the created user as JSON
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding user.');
        res.status(400).send(); // Send a bad request response
    }
});

// Update a user
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send(); 
        }
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(400).send(); 
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send(); 
        }
        res.status(204).send(); 
    } catch (err) {
        console.error(err);
        res.status(500).send(); 
    }
});

module.exports = router;
