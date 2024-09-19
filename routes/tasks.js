const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Ensure this path is correct based on your project structure

// Add a new task
router.post('/', async (req, res) => {
    const { title, description, status } = req.body;

    // Validate the incoming request
    if (!title || !description || !status) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // Create a new Task instance
        const newTask = new Task({
            title,
            description,
            status
        });

        // Save the task to the database
        await newTask.save();

        // Send success response with the saved task
        res.status(201).json(newTask);
    } catch (err) {
        console.error('Error saving task:', err);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

module.exports = router;
