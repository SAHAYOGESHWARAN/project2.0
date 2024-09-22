const mongoose = require('mongoose');

// Define the Message schema
const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('Message', messageSchema);
