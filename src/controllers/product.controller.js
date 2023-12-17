const Product = require('../models/product.model');

exports.addEditProduct = async (req, res) => {
    try {
        console.log('body',req.body)
        const productId = req.body._id;
        const productData = req.body;

        console.log('getting product id: ', productId)
        if (productId) {
            // Update existing product
            const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(updatedProduct);
        } else {
            console.log('new product ')
            // Create new product
            const newProduct = new Product(productData);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        }
    } catch (error) {
        console.error('Error adding/editing product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('images');
        res.json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId).populate('images');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error retrieving product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
