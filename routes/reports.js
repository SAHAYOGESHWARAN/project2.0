const express = require('express');
const router = express.Router();

// Mock data for reports
router.get('/', (req, res) => {
    const reports = [
        { date: '2024-01-15', type: 'Monthly', details: 'January sales report', status: 'Completed' },
        { date: '2024-02-15', type: 'Monthly', details: 'February sales report', status: 'In Progress' },
        { date: '2024-03-15', type: 'Monthly', details: 'March sales report', status: 'Pending' },
        // Add more mock data or fetch from your database
    ];
    res.json(reports);
});

module.exports = router;
