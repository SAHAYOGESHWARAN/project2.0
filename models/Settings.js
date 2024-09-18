const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    profileName: { type: String },
    emailNotifications: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false }
});

module.exports = mongoose.model('Settings', settingsSchema);
