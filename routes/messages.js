const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Assuming you have a Message model

// Route to render messages management page
router.get('/', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            req.flash('error', 'Error fetching messages');
            return res.redirect('/');
        }
        res.render('messages', {
            messages: messages,
            msg: {
                success: req.flash('success'),
                error: req.flash('error')
            }
        });
    });
});

// Route to handle adding a new message
router.post('/add', (req, res) => {
    const newMessage = new Message({
        content: req.body.content,
        timestamp: new Date()
    });

    newMessage.save((err) => {
        if (err) {
            req.flash('error', 'Failed to send the message');
            return res.redirect('/messages');
        }
        req.flash('success', 'Message sent successfully!');
        res.redirect('/messages');
    });
});

module.exports = router;
