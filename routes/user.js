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

// Add User route
router.post('/users/add', async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const newUser = new User({ name, email, role });
        await newUser.save();
        req.flash('success_msg', 'User added successfully!');
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding user.');
        res.redirect('/users');
    }
});

module.exports = router;
