const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch tasks from MongoDB
        res.json({ tasks }); // Ensure the key is 'tasks' and it sends a JSON response
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    try {
        const { task } = req.body; // Get task description from the request body
        const newTask = new Task({ description: task });
        await newTask.save(); // Save the task to MongoDB
        res.redirect('/tasks'); // Redirect to tasks page after saving
    } catch (err) {
        res.status(500).json({ error: 'Failed to save task' });
    }
});

module.exports = router;
