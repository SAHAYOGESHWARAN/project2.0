const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const { localAuth } = require('./config/passportLogic');
require('dotenv').config();

// Import routes
const userRoute = require('./routes/user');
const productRoutes = require('./routes/products');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');
const indexRoutes = require('./routes/index');

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
    secret: process.env.SESSION_SECRET || "please log me in",
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if HTTPS is used in production
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; // Set user for views
    next();
});

// Serve static files (CSS, Fonts)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoutes);
app.use('/users', userRoute);
app.use('/products', productRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/settings', settingsRoutes);

// Handle logout logic here
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Define error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        error: err.message 
    });
});

// Listen on the specified port
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
