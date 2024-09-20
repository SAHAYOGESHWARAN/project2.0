// File Path: E:/your-project/backend/db.js
const mongoose = require('mongoose');

mongoose.connect(' MONGO_URI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
