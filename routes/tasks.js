const express = require('express');
const router = express.Router();

// Route for Tasks page
router.get('/', (req, res) => {
    res.render('tasks', { activePage: 'tasks' });
});

module.exports = router;
