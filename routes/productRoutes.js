
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import your Product model

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Query to get all products
        res.render('products', { products }); // Passing 'products' to the view
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
