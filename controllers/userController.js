
const User = require('../models/User'); 

// Function to get users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to add user
exports.addUser = async (req, res) => {
    const { name, username, password, phonenumber, email, role } = req.body;
   
    const newUser = new User({ name, username, password, phonenumber, email, role });

    try {
        await newUser.save(); 
        req.flash('success_msg', 'User registered successfully!'); 
        res.redirect('/users'); 
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error registering user.'); 
        res.redirect('/users');
    }
};
