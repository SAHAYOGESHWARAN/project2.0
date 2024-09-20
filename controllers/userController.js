
const User = require('../models/User'); // Adjust the path to your User model

// Function to get users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch users from MongoDB
        res.render('users', { users }); // Render the users view and pass the user data
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to add user
exports.addUser = async (req, res) => {
    const { name, username, password, phonenumber, email, role } = req.body;
    // You can add validation and error handling here
    const newUser = new User({ name, username, password, phonenumber, email, role });

    try {
        await newUser.save(); // Save user to MongoDB
        req.flash('success_msg', 'User registered successfully!'); // Flash message
        res.redirect('/users'); // Redirect to users page
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error registering user.'); // Flash message
        res.redirect('/users');
    }
};
