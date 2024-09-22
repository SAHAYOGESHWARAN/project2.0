const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this path exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', {
            products: products,
            messages: req.flash('success') || req.flash('error')
        });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error fetching products.');
        res.redirect('/');
    }
});

// Route to add a new product
router.post('/add', upload.single('productImage'), async (req, res) => {
    try {
        const { productName, productPrice, productCategory } = req.body;
        const product = new Product({
            name: productName,
            price: productPrice,
            category: productCategory,
            imageUrl: `/uploads/${req.file.filename}`
        });
        await product.save();
        req.flash('success', 'Product added successfully!');
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to add product.');
        res.redirect('/products');
    }
});

module.exports = router;
