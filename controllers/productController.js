const Product = require('../models/Product');

// Controller for adding a product
exports.addProduct = (req, res) => {
    const productData = {
        name: req.body.productName,
        price: req.body.productPrice,
        category: req.body.productCategory,
        imageUrl: `/uploads/${req.file.filename}`
    };
    
    // Save productData to the database
    const newProduct = new Product(productData);
    newProduct.save()
        .then(() => res.status(201).json({ message: 'Product added successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
};

// Controller for updating a product
exports.updateProduct = (req, res) => {
    const productId = req.params.id;
    const updatedData = {
        name: req.body.productName,
        price: req.body.productPrice,
        category: req.body.productCategory,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
    };

    Product.findByIdAndUpdate(productId, updatedData, { new: true })
        .then(updatedProduct => res.status(200).json(updatedProduct))
        .catch(err => res.status(400).json({ error: err.message }));
};
