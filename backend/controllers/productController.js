const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// Description
// @desc    Fetch all the products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({});

    res.json(products);
});

// Description
// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found here');
    }
});

module.exports = {
    getProducts,
    getProductById
}