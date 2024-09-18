const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add Product
router.post('/add', async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const newProduct = new Product({ name, price, category });
        await newProduct.save();
        res.status(201).send('Product added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding product');
    }
});

// Get Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
});

// Delete Product
router.delete('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send('Product deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting product');
    }
});

module.exports = router;
