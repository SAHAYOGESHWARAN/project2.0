const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const productController = require('../controllers/productController');

// Route for adding a product
router.post('/add', upload.single('productImage'), productController.addProduct);

// Route for updating a product
router.put('/:id', upload.single('productImage'), productController.updateProduct);

module.exports = router;
