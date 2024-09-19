const User = require('../models/User');

// Render the add user form
exports.getAddUser = (req, res) => {
    res.render('addUser');
};

// Handle user addition
exports.addUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const newUser = new User({ name, email, role });
        await newUser.save();
        req.flash('success_msg', 'User added successfully!');
        res.redirect('/users'); // Redirect to user list after addition
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding user.');
        res.redirect('/users/add'); // Redirect back to form on error
    }
};
