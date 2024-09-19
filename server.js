const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const productRoutes = require('./routes/products');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');
const { localAuth } = require('./config/passportLogic');
const messageRoutes = require('./routes/messages');
const cors = require('cors');
const tasksRoute = require('./routes/tasks'); // Adjust the path as needed

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => console.error('MongoDB connection error:', err));

// Passport local authentication strategy
localAuth(passport);

// Set up EJS and Express layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static folder
app.use('/static', express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({ 
    secret: process.env.SESSION_SECRET || 'please log me in',
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS in production
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// Connect flash for flash messages
app.use(flash());

// Global variables for flash messages and user
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; // Set user globally for views
    res.locals.activePage = ''; // Default value, will be set in route handlers
    next();
});

// Event Schema
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
});

const Event = mongoose.model('Event', eventSchema);

// Routes
app.use('/events', require('./routes/events')); // Make sure to have event routes defined

app.use('/users', userRoute);
app.use('/products', productRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/settings', settingsRoutes);
app.use('/tasks', tasksRoute); // Use tasksRoute consistently

// Get all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: "Error fetching events" });
    }
});

// Add a new event
app.post('/events', async (req, res) => {
    try {
        const newEvent = new Event({ title: req.body.title, date: req.body.date });
        const savedEvent = await newEvent.save();
        res.json(savedEvent);
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: "Error adding event" });
    }
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        error: err.message 
    });
});

// Start the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
