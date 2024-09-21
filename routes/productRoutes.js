const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path if needed

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();  // Replace this with your actual query
        res.render('products', { products: products });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
