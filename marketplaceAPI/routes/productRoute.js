const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express();

const {getProductById, getTotalProducts, getProductsFeed, searchProduct, createProduct, deleteProduct, updateProduct} = require('../controllers/productController');

router.get('/', async (req, res)=>{
    try{
        return res.statusCode(200).send({products})
    }catch(e){
        return res.status(400).send({error: e.message});
    }
});

router.get('/get/:id', getProductById);
router.get('/getTotal', getTotalProducts);
router.get('/getAll', getProductsFeed);
router.get('/search/:term', searchProduct);
router.post('/create', upload.any(), createProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', upload.any(), updateProduct);


module.exports = router;