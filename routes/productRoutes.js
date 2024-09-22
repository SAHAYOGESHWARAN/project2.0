const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Product = require('../models/Product'); // Your Product model

// Route for getting products management page
router.get('/manage', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.render('products', { products }); // Pass products to the view
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route for adding a product
router.post('/add', upload.single('productImage'), async (req, res) => {
    const productData = {
        name: req.body.productName,
        price: req.body.productPrice,
        category: req.body.productCategory,
        imageUrl: `/uploads/${req.file.filename}`
    };

    try {
        const newProduct = new Product(productData);
        await newProduct.save();
        res.redirect('/products/manage'); // Redirect to the manage products page
    } catch (err) {
        console.error(err);
        res.status(400).send('Error adding product');
    }
});

// Other routes (update, delete)...
module.exports = router;
