const express = require('express');
const multer = require('multer');
const router = express.Router();
const path  = require('path');
const cloud = require('cloudinary');
const asyncHandler = require('express-async-handler');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'frontend/public/uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/ ;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
})

// router.post('/', upload.single('image'), (req, res) => {
//     res.send(`/${req.file.path}`);
// })

router.post('/', upload.single('image'), asyncHandler (async (req, res) => {
    const uploadPhoto = await cloud.uploader.upload(`${req.file.path}`);
    console.log(uploadPhoto);
    console.log(uploadPhoto.url);
    res.send(uploadPhoto.url); 
}))

module.exports = router;