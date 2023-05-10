const express = require('express');
const multer = require('multer');
const upload = multer()

const router = express();
const {getImage, uploadImage, deleteImage} = require('../controllers/dropboxController');

router.get('/getimage/:filename', getImage)

router.post('/uploadimage', upload.any(), uploadImage)

router.post('/deleteimage', deleteImage)

module.exports = router;

