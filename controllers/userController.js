// controllers/userController.js
const User = require('../models/User');

// Render the users page
exports.getUsers = async (req, res) => {
    const users = await User.find(); // Fetch users from the database
    res.render('users', { users }); // Render the users page with user data
};

// Handle adding a new user
exports.addUser = async (req, res) => {
    try {
        const { name, username, password, phonenumber, email, role } = req.body; // Get data from form
        const newUser = new User({ name, username, password, phonenumber, email, role }); // Create a new user instance
        await newUser.save(); // Save user to MongoDB
        req.flash('success_msg', 'User added successfully!'); // Success message
        res.redirect('/users'); // Redirect to users page
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding user: ' + err.message); // Error message
        res.redirect('/users'); // Redirect back to users page
    }
};