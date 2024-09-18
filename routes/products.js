const express = require('express');
const router = express.Router();

// In-memory storage for products (use database in real-world scenarios)
let products = [];
let productId = 1;

// GET route to fetch all products
router.get('/', (req, res) => {
    res.render('products', { products }); // Pass products to the EJS view
});

// POST route to add a new product
router.post('/add', (req, res) => {
    const { productName, productPrice, productCategory } = req.body;

    if (!productName || !productPrice || !productCategory) {
        return res.status(400).send('All fields are required');
    }

    const newProduct = {
        id: productId++,  // Increment product ID
        name: productName,
        price: productPrice,
        category: productCategory
    };

    products.push(newProduct);
    res.status(201).json(newProduct);  // Send the new product as JSON
});

module.exports = router;
