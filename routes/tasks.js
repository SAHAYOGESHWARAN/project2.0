// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import Task model

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from MongoDB
        res.json({ tasks }); // Return tasks as JSON
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Add a new task
router.post('/', async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const newTask = new Task({ title, description, status });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create task' });
    }
});

module.exports = router;
