const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ tasks });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    try {
        const { task } = req.body;
        const newTask = new Task({ description: task });
        await newTask.save();
        res.redirect('/tasks'); // Redirect back to the tasks page
    } catch (err) {
        res.status(500).json({ error: 'Failed to save task' });
    }
});

module.exports = router;
