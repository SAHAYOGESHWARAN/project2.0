
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    type: { type: String, required: true }, // e.g., 'monthly', 'yearly'
    details: { type: String, required: true },
    status: { type: String, required: true } // e.g., 'completed', 'pending'
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
