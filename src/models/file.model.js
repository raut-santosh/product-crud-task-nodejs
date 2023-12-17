const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    name: { type: String },// required: true
    path: { type: String },
    type: { type: String },
    size: { type: Number }, //in bytes
    is_active: { type: Boolean, default: true },
}, { timestamp: true });


module.exports = mongoose.model("File", fileSchema);
