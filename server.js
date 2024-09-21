const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const productRoutes = require('./routes/productRoutes');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');
const { localAuth } = require('./config/passportLogic');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reportRoutes = require('./routes/reportRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Passport local authentication strategy
localAuth(passport);

// Connect to MongoDB
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

// Set up static folder
app.use('/static', express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({ 
    secret: process.env.SESSION_SECRET || 'please log me in',
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false }
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
    res.locals.user = req.user || null; 
    res.locals.activePage = ''; 
    next();
});

// Routes
app.use('/users', userRoute);
app.use('/products', productRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/settings', settingsRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes); // Add a prefix for event routes
app.use('/api', reportRoutes);

// Frontend Routes
app.get('/dashboard', (req, res) => {
    res.locals.activePage = 'dashboard';
    res.render('dashboard');
});

// Users route
app.get('/users', (req, res) => {
    res.locals.activePage = 'users';
    res.render('users');
});

// Products route
app.get('/products', (req, res) => {
    res.locals.activePage = 'products';
    res.render('products');
});

// Analytics route
app.get('/analytics', (req, res) => {
    res.locals.activePage = 'analytics';
    res.render('analytics');
});

// Settings route
app.get('/settings', (req, res) => {
    res.locals.activePage = 'settings';
    res.render('settings');
});

// Handle logout
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Handle home route
app.get('/', (req, res) => {
    res.render('home');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        error: err.message 
    });
});

// Use the message routes
app.use('/messages', messageRoutes);

// Additional Frontend Routes
app.get('/messages', (req, res) => {
    res.render('messages', { activePage: 'messages' });
});
app.get('/tasks', (req, res) => {
    res.render('tasks', { activePage: 'tasks' });
});
app.get('/calendar', (req, res) => {
    res.render('calendar', { activePage: 'calendar' });
});
app.get('/admin', (req, res) => {
    res.render('admin', { activePage: 'admin' });
});
app.get('/docs', (req, res) => {
    res.render('docs', { activePage: 'docs' });
});

// Start the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
