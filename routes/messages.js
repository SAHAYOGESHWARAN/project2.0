const express = require('express');
const router = express.Router();

// Route for Messages page
router.get('/', (req, res) => {
    res.render('messages', { activePage: 'messages' });
});

module.exports = router;
