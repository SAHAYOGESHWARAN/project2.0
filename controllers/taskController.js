// controllers/taskController.js
const Task = require('../models/Task');

// Add a new task
exports.addTask = async (req, res) => {
    try {
        const { task } = req.body;
        const newTask = new Task({ description: task });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Error adding task' });
    }
};

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ date: -1 });
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};
