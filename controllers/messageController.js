const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.render('messages', { messages, msg: {} });  // Pass an empty `msg` object initially
    } catch (error) {
        console.error(error);
        res.render('messages', { messages: [], msg: { error: 'Failed to fetch messages.' } });
    }
};

exports.addMessage = async (req, res) => {
    const { content } = req.body;
    try {
        const newMessage = new Message({ content });
        await newMessage.save();
        res.redirect('/messages');
    } catch (error) {
        console.error(error);
        res.render('messages', { messages: await Message.find(), msg: { error: 'Failed to add message.' } });
    }
};
