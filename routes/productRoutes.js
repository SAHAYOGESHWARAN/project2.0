
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Make sure to import your Product model

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products from the database
        res.render('products', { products }); // Pass the products to the view
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Server Error'); // Send a 500 response if an error occurs
    }
});

module.exports = router;
