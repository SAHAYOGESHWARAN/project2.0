const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const port = process.env.PORT || 8000;

// Passport local authentication strategy
const { localAuth } = require('./config/passportLogic');
localAuth(passport);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tasksdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => console.error('MongoDB connection error:', err));

// Set up EJS and Express layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static folders
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'please log me in',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
}));

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
const userRoute = require('./routes/user');
const productRoutes = require('./routes/productRoutes');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');
const messageRoutes = require('./routes/messages');
const eventRoutes = require('./routes/eventRoutes');
const reportRoutes = require('./routes/reports');
const taskRoutes = require('./routes/tasks');
const messagesController = require('./controllers/messageController');

// Register routes
app.use('/users', userRoute);
app.use('/products', productRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/settings', settingsRoutes);
app.use('/events', eventRoutes);
app.use('/api', reportRoutes);
app.use('/tasks', taskRoutes);

// Messages routes
app.get('/messages', messagesController.getMessages);
app.post('/messages/add', messagesController.addMessage);

// Frontend Routes
app.get('/dashboard', (req, res) => {
    res.locals.activePage = 'dashboard';
    res.render('dashboard');
});

app.get('/users', (req, res) => {
    res.locals.activePage = 'users';
    res.render('users');
});

app.get('/products', (req, res) => {
    res.locals.activePage = 'products';
    res.render('products');
});

app.get('/analytics', (req, res) => {
    res.locals.activePage = 'analytics';
    res.render('analytics');
});

app.get('/settings', (req, res) => {
    res.locals.activePage = 'settings';
    res.render('settings');
});

// Handle logout
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Handle home route
app.get('/', (req, res) => {
    res.render('home');
});

// Route for Reports page
app.get('/reports', (req, res) => {
    res.render('reports', { activePage: 'reports' });
});

// Additional Frontend Routes
app.get('/calendar', (req, res) => {
    res.render('calendar', { activePage: 'calendar' });
});

app.get('/admin', (req, res) => {
    res.render('admin', { activePage: 'admin' });
});

app.get('/docs', (req, res) => {
    res.render('docs', { activePage: 'docs' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        error: err.message,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});
