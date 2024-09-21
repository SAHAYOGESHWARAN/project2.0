
const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const calendar = require('../config/googleConfig');

// Save event to MongoDB and Google Calendar
router.post('/events', async (req, res) => {
    const { title, date } = req.body;

    try {
        // Save to MongoDB
        const event = new Event({ title, date });
        await event.save();

        // Save to Google Calendar
        const eventStartTime = new Date(date);
        const eventEndTime = new Date(date);
        eventEndTime.setHours(eventEndTime.getHours() + 1); // Example: Set 1 hour duration

        const googleEvent = {
            summary: title,
            start: { dateTime: eventStartTime.toISOString() },
            end: { dateTime: eventEndTime.toISOString() },
        };

        calendar.events.insert({
            calendarId: 'primary',
            resource: googleEvent,
        }, (err, event) => {
            if (err) {
                console.error('Error contacting Google Calendar service:', err);
                return res.status(500).json({ error: 'Error saving to Google Calendar' });
            }
            console.log('Event created in Google Calendar:', event.data);
        });

        res.status(201).json({ message: 'Event saved to MongoDB and Google Calendar', event });

    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Get events from MongoDB
router.get('/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
