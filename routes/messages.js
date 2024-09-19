const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json({ messages });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// POST a new message
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        const newMessage = new Message({ content: message });
        await newMessage.save();
        res.redirect('/messages'); 
    } catch (err) {
        res.status(500).json({ error: 'Failed to save message' });
    }
});

module.exports = router;
