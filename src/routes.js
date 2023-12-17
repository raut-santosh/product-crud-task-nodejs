const { fileUpload, uploadSingle, uploadMultiple } = require('./controllers/file.controller');
const productController = require('./controllers/product.controller');

module.exports = function (app) {

    // Handling cors errors (middleware)
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });

    app.get('', (req, res) => res.json({ msg: 'hello world!' }));

    // File Upload Routes
    app.post("/upload/file", uploadSingle, fileUpload);
    app.post("/upload/files", uploadMultiple, fileUpload);

    // Product Routes
    app.post('/products', productController.addEditProduct);
    app.get('/products', productController.getAllProducts);
    app.get("/products/:id", productController.getProductById);
    app.delete("/products/:id", productController.deleteProductById);
};
