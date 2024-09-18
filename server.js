const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const productRoutes = require('./routes/products');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');
const { localAuth } = require('./config/passportLogic');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

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
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', userRoute);
app.use('/products', productRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/settings', settingsRoutes);

// Pages
app.get('/', (req, res) => {
    res.render('home');
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { activePage: 'dashboard' });
});

// Users route
app.get('/users', (req, res) => {
    res.render('users', { activePage: 'users' });
});

// Products route
app.get('/products', (req, res) => {
    res.render('products', { activePage: 'products' });
});

// Analytics route
app.get('/analytics', (req, res) => {
    res.render('analytics', { activePage: 'analytics' });
});

// Settings route
app.get('/settings', (req, res) => {
    res.render('settings', { activePage: 'settings' });
});

// Handle logout
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
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
