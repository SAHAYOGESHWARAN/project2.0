const express = require('express');
const router = express.Router();

// Route for Reports page
router.get('/', (req, res) => {
    res.render('reports', { activePage: 'reports' });
});

module.exports = router;
