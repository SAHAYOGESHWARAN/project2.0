const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add a new product
router.post('/add', async (req, res) => {
    try {
        const { productName, productPrice, productCategory } = req.body;

        // File upload handling
        let productImage = req.files ? req.files.productImage : null;
        const imageUrl = `/uploads/${productImage.name}`;

        // Save product image
        if (productImage) {
            await productImage.mv(`./uploads/${productImage.name}`);
        }

        const newProduct = new Product({
            name: productName,
            price: productPrice,
            category: productCategory,
            imageUrl,
        });

        await newProduct.save();
        req.flash('success_msg', 'Product added successfully');
        res.redirect('/products');
    } catch (error) {
        req.flash('error_msg', 'Error adding product');
        res.redirect('/products');
    }
});

// List products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (error) {
        req.flash('error_msg', 'Error retrieving products');
        res.render('products', { products: [] });
    }
});

module.exports = router;
