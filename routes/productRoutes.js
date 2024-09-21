const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import your Product model

// Route to get all products
router.get('/', async (req, res) => { // Change to router.get
    try {
        const products = await Product.find(); // Fetch products from your MongoDB
        res.render('products', { products: products }); // Pass products to the view
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
