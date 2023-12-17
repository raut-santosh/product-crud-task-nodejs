const File = require('../models/file.model');
const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        const fieldName = file.fieldname || "file"; // Use "file" as the default field name
        cb(null, fieldName + "-" + Date.now() + path.extname(file.originalname));
    },
       
});

// Create multer instance for single and multiple file uploads
exports.uploadSingle = multer({ storage }).single("file");
exports.uploadMultiple = multer({ storage }).array("files", 5); // Set the maximum number of files as needed

exports.fileUpload = async (req, res) => {
    console.log('req.files')
    // For single file upload
    if (req.file) {
        console.log("Single File Upload:", req.file);
        const file = new File({
            name: req.file.originalname,
            path: req.file.path,
            type: req.file.mimetype,
            size: req.file.size,
            is_active: true,
        });
        file.save()
            .then((result) => {
                result.msg = 'File Uploaded Successfully';
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    }
    // For multiple files upload
    else if (req.files) {
        console.log("Multiple Files Upload:", req.files);
        const files = req.files.map(file => ({
            name: file.originalname,
            path: file.path,
            type: file.mimetype,
            size: file.size,
            is_active: true,
        }));

        File.insertMany(files)
            .then((result) => {
                result.forEach(file => {
                    file.msg = 'File Uploaded Successfully';
                });
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    } else {
        res.status(400).json({ msg: 'No files provided' });
    }
};

