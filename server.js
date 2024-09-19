const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const productRoutes = require('./routes/products');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');
const messageRoutes = require('./routes/messages');
const tasksRoute = require('./routes/tasks');
const eventRoutes = require('./routes/events');
const { localAuth } = require('./config/passportLogic');

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

// Set up EJS and Express layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'please log me in',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS in production
}));

// Passport local authentication strategy
localAuth(passport);
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

// Define routes
app.use('/events', eventRoutes);
app.use('/users', userRoute);
app.use('/products', productRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/settings', settingsRoutes);
app.use('/tasks', tasksRoute);

// Define the calendar route
app.get('/calendar', (req, res) => {
    res.render('calendar', { activePage: 'calendar' });
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.render('home'); // Adjust if you have a home view
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
