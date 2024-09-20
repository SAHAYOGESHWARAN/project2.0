const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Order = require('../models/Order'); 

// Get user sign-ups data
router.get('/user-signups', async (req, res) => {
    try {
        // Sample query to fetch user sign-ups over time
        // Adjust the query as per your requirements
        const data = await User.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        const labels = data.map(entry => entry._id);
        const values = data.map(entry => entry.count);

        res.json({ labels, values });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching user sign-ups data');
    }
});

// Get product sales data
router.get('/product-sales', async (req, res) => {
    try {
        // Sample query to fetch product sales over time
        // Adjust the query as per your requirements
        const data = await Order.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$orderDate" } }, totalSales: { $sum: "$totalAmount" } } },
            { $sort: { _id: 1 } }
        ]);

        const labels = data.map(entry => entry._id);
        const values = data.map(entry => entry.totalSales);

        res.json({ labels, values });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching product sales data');
    }
});

module.exports = router;
