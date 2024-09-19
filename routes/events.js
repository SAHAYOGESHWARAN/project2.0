// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Ensure this points to your Event model

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: "Error fetching events" });
    }
});

// Add a new event
router.post('/', async (req, res) => {
    try {
        const newEvent = new Event({
            title: req.body.title,
            date: req.body.date,
        });
        const savedEvent = await newEvent.save();
        res.json(savedEvent);
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: "Error adding event" });
    }
});

module.exports = router;
