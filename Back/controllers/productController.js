const Product = require('../models/product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
    
        const product = await Product.findById(id);
        res.status(200).json({ product });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, quantity } = req.body;
        const newProduct = new Product({ name, price, description, image, category, quantity });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const updateProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.params;
        const { name, price, description, image, category, quantity } = req.body;
        await Product.findByIdAndUpdate
            (id, { name, price, description, image, category, quantity });
        res.status(200).json({ message: 'Product updated successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };



