const express = require('express');
const router = express.Router();

// Route for Documentation page
router.get('/', (req, res) => {
    res.render('docs', { activePage: 'docs' });
});

module.exports = router;
