const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
