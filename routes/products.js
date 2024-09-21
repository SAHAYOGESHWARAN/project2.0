const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const Product = require('../models/Product'); // Assuming you have a Product schema
const router = express.Router();

// AWS S3 configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Multer configuration for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle adding a new product
router.post('/add', upload.single('productImage'), async (req, res) => {
    const { productName, productPrice, productCategory } = req.body;

    // Upload image to S3
    const params = {
        Bucket: process.env.S3_BUCKET_NAME, // Your S3 bucket name
        Key: `products/${Date.now()}_${req.file.originalname}`, // File name
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    };

    s3.upload(params, async (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error uploading image');
        }

        // Save product in MongoDB with image URL
        const newProduct = new Product({
            name: productName,
            price: parseFloat(productPrice),
            category: productCategory,
            imageUrl: data.Location // S3 URL of the uploaded image
        });

        try {
            await newProduct.save();
            res.redirect('/products');
        } catch (error) {
            res.status(500).send('Error saving product');
        }
    });
});

module.exports = router;
