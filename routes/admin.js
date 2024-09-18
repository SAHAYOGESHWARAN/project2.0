const express = require('express');
const router = express.Router();

// Route for Admin Panel page
router.get('/', (req, res) => {
    res.render('admin', { activePage: 'admin' });
});

module.exports = router;
