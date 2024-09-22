// In your productRoutes.js or wherever your products routes are defined

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path to your Product model

// Route to render the products page
router.get('/', async (req, res) => {
    try {
        // Fetch products from the database
        const products = await Product.find(); // Fetch all products
        res.render('products', { products }); // Pass products to the view
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).render('error', { error: 'Error fetching products' });
    }
});

module.exports = router;
