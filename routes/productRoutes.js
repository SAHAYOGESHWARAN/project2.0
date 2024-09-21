const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const Product = require('../models/Product'); // Import your Product model
const router = express.Router();

// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products: products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Route to add a new product
router.post('/add', upload.single('productImage'), async (req, res) => {
    const { productName, productPrice, productCategory } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(params).promise();
        const newProduct = new Product({
            name: productName,
            price: productPrice,
            category: productCategory,
            imageUrl: data.Location // Store the URL of the uploaded image
        });
        await newProduct.save();
        res.redirect('/products'); // Redirect to products page after adding
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file to S3');
    }
});

module.exports = router;
