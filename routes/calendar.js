const express = require('express');
const router = express.Router();

// Route for Calendar page
router.get('/', (req, res) => {
    res.render('calendar', { activePage: 'calendar' });
});

module.exports = router;
