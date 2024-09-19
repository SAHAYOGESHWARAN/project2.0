// In middleware/flashMiddleware.js
const session = require('express-session');
const flash = require('connect-flash');

const flashMiddleware = (app) => {
    // Set up session
    app.use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true
    }));

    // Initialize flash
    app.use(flash());

    // Middleware to pass flash messages to templates
    app.use((req, res, next) => {
        res.locals.messages = {
            success: req.flash('success_msg'),
            error: req.flash('error_msg')
        };
        next();
    });
};

module.exports = flashMiddleware;
