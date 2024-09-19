// In your userController.js
const User = require('../models/User'); // Ensure you have your User model imported

exports.addUser = async (req, res) => {
    try {
        const { name, username, password, phonenumber, email, role } = req.body;

        // Create a new user instance
        const newUser = new User({ name, username, password, phonenumber, email, role });
        await newUser.save(); // Save to MongoDB

        req.flash('success_msg', 'User registered successfully!'); // Flash message for success
        res.redirect('/users'); // Redirect back to users page
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error registering user: ' + err.message); // Flash message for error
        res.redirect('/users'); // Redirect back to users page
    }
};
