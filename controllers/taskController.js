// backend/controllers/taskController.js
const Task = require('../models/Task');
const { addTaskToSheet } = require('../config/googleSheet');
const { addTaskToCalendar } = require('../config/googleCalendar');

exports.addTask = async (req, res) => {
    try {
        const { task } = req.body;

        const newTask = new Task({ description: task });
        await newTask.save();

        // Save to Google Sheets and Calendar
        await addTaskToSheet(newTask);
        await addTaskToCalendar(newTask);

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Error adding task' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ date: -1 });
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};
