const express = require('express');
const router = express.Router();


let products = [];
let productId = 1;

router.get('/', (req, res) => {
    res.render('products', {
        products,            
        activePage: 'products'  
    });
});


// POST route to add a new product
router.post('/add', (req, res) => {
    const { productName, productPrice, productCategory } = req.body;

    if (!productName || !productPrice || !productCategory) {
        return res.status(400).send('All fields are required');
    }

    const newProduct = {
        id: productId++, 
        name: productName,
        price: productPrice,
        category: productCategory
    };

    products.push(newProduct);
    res.status(201).json(newProduct);  
});

module.exports = router;
