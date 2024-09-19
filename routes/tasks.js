const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Route to get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();  // Fetch all tasks from MongoDB
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Route to create a new task
router.post('/', async (req, res) => {
    const { name, status } = req.body;
    try {
        const newTask = new Task({ name, status });
        await newTask.save();  // Save the task in MongoDB
        res.status(201).json({ message: 'Task created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

module.exports = router;
