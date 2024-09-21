
const express = require('express');
const { getReports } = require('../controllers/reportController');
const router = express.Router();

router.get('/reports', getReports);

module.exports = router;
