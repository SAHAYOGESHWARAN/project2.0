// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
});

// Check if the model already exists
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

module.exports = Event;
