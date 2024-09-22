const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Adjust the path as needed

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ tasks });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const task = new Task({
        description: req.body.task,
        date: new Date(),
    });
    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
