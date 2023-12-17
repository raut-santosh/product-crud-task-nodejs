const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, unique: true },
    price: { type: Number, default: 0 },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    is_active: { type: Boolean, default: true },
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);
