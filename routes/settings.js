const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings'); // Adjust the path as needed

// Get settings
router.get('/', async (req, res) => {
    try {
        const settings = await Settings.findOne({ userId: req.user._id });
        res.render('settings', { settings: settings || {}, message: req.flash('success_msg'), error: req.flash('error_msg') });
    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
});

// Update settings
router.post('/update', async (req, res) => {
    try {
        const { profileName, emailNotifications, darkMode } = req.body;
        await Settings.findOneAndUpdate(
            { userId: req.user._id },
            { profileName, emailNotifications: !!emailNotifications, darkMode: !!darkMode },
            { upsert: true }
        );
        req.flash('success_msg', 'Settings updated successfully.');
        res.json({ success: true, message: 'Settings updated successfully.' });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating settings.');
        res.json({ success: false, message: 'Error updating settings.' });
    }
});

module.exports = router;
