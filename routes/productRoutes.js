const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming Product model exists

// Route to display products page
router.get('/', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            req.flash('error_msg', 'Error fetching products');
            return res.redirect('/');
        }
        res.render('products', {
            products: products,
            messages: {
                success: req.flash('success_msg'),
                error: req.flash('error_msg')
            }
        });
    });
});

// Route to add a new product
router.post('/add', (req, res) => {
    const { productName, productPrice, productCategory } = req.body;

    // Assuming file upload is handled
    const productImage = req.files.productImage; // from file upload

    const newProduct = new Product({
        name: productName,
        price: productPrice,
        category: productCategory,
        imageUrl: `/uploads/${productImage.name}` // Example for storing image
    });

    newProduct.save((err) => {
        if (err) {
            req.flash('error_msg', 'Error adding product');
            return res.redirect('/products');
        }
        productImage.mv(`./uploads/${productImage.name}`, (err) => {
            if (err) {
                req.flash('error_msg', 'Error uploading product image');
                return res.redirect('/products');
            }
            req.flash('success_msg', 'Product added successfully');
            res.redirect('/products');
        });
    });
});

module.exports = router;
