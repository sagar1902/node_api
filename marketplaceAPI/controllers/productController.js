
const fetch = require('node-fetch');
const { UniqueString } = require('unique-string-generator');
const Product = require('../models/Product');
const User = require('../models/User');


exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('createdBy');
        if (!product) { throw ('product not found'); }
        return res.status(200).send(product);
    } catch (e) {
        return res.status(400).send({ error: e });
    }
}

exports.getTotalProducts = async (req, res) => {
    try{
        const count = await Product.countDocuments({})
        return res.status(200).send({ count });
    }catch(e){
        return res.status(400).send({ error: e});
    }
}

exports.getProductsFeed = async (req, res) => {
    try{
        const {pagesize=6, page=1} = req.query;
        let products = await Product.find();
        products.sort((a, b) => { return b.createdAt - a.createdAt; });
        products = products.slice((page-1)*pagesize, page*pagesize)
        return res.status(200).send({count: products.length, products});
    }catch(e){
        return res.status(400).send({ error: e });
    }
}

exports.searchProduct = async (req, res) => {
    try{
        const products = await Product.find({ name: {$regex: req.params.term, $options: 'i'}});
        return res.status(200).send({result_count:products.length, products})
    }catch(e){
        return res.status(400).send({ error: e });
    }
}

exports.createProduct = async (req, res, next) => {
    // no headers needed
    // headers: auth bearer access token
    //body: form: name, user_id, files:singlefile
    try {
        req.imagename = UniqueString() + '.' + req.files[0].originalname.split(".")[1]
        const drop = await uploadTOdropbox(req, res, next)
        if (drop.e) { throw (drop.e) }
        await Product.create({ name: req.body.name, image: req.imagename, createdBy: req.body.user_id })
        return res.status(201).send({ message: 'created product' })
    } catch (e) {
        return res.status(400).send({ error: e })
    }
}


exports.deleteProduct = async (req, res, next) => {
    // call delete with product id as parameter
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        const drop = await deleteFROMdropbox(req, res, data);
        if (drop.e) { throw (drop.e) }
        return res.status(200).send({ message: { status: 'deleted', id: data._id } })
    } catch (e) {
        return res.status(400).send({ error: e })
    }
}


exports.updateProduct = async (req, res, next) => {
    // no headers needed
    // headers: auth bearer access token
    // params: product id
    //body: files:singlefile
    try {
        const product = await Product.findById(req.params.id);
        const drop = await deleteFROMdropbox(req, res, product);
        if (drop.e) { throw (drop.e) }
        req.imagename = product.image;
        const create = await uploadTOdropbox(req, res, next);
        if (create.e) { throw (create.e) }
        return res.status(200).send({ message: 'updated successfully' })
    } catch (e) {
        return res.status(400).send({ error: e });
    }
}

// uploadTOdatabase = async (req, res, next) => {

// }

//////////////////////// DROPBOX /////////////////////
// exports.getImage = async (req, res, next) => {
//     const filePath = `https://content.dropboxapi.com/2/files/download?arg={"path":"/user/${req.params.filename}"}`;
//     try {
//         const fileData = await fetch(filePath, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `${req.headers.authorization}`,
//             },
//         });
//         if (fileData.status !== 200) {
//             throw new Error('Failed to retrieve file');
//         }
//         const img = await fileData.buffer();
//         res.send({ img });
//     } catch (error) {
//         next(error);
//     }
// }


uploadTOdropbox = async (req, res, next) => {
    try {
        const filePath = `https://content.dropboxapi.com/2/files/upload?arg={"path":"/user/${req.imagename}"}`
        const data = await fetch(filePath, {
            method: 'POST',
            headers: {
                'Authorization': `${req.headers.authorization}`,
                'Content-Type': 'application/octet-stream'
            },
            body: req.files[0].buffer
        });
        return data;
    } catch (e) { return { e } }
}


// uploadImage = async (req, res, next) => {
//     try{
//         const filename = UniqueString()+'.'+req.files[0].originalname.split(".")[1]
//         const filePath = `https://content.dropboxapi.com/2/files/upload?arg={"path":"/user/${filename}"}`
//         const data = await fetch(filePath, {
//             method: 'POST',
//             headers:{
//                 'Authorization': `${req.headers.authorization}`,
//                 'Content-Type': 'application/octet-stream'
//             },
//             body:req.files[0].buffer
//         });
//         await Product.create({name:req.body.name, image:filename, createdBy:req.body.user_id})
//         return res.status(201).send({data});
//     }catch(e){
//         if(e.message.split(' '[1] == 'Product')){
//             // logic to rollback dropbox upload
//         }
//         return res.status(400).send({error:e});
//     }
// }


deleteFROMdropbox = async (req, res, data) => {
    try {
        const filePath = `https://api.dropboxapi.com/2/files/delete_v2`
        const result = await fetch(filePath, {
            method: 'POST',
            headers: {
                'Authorization': `${req.headers.authorization}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: '/user/' + data.image })
        });
        if (result.status !== 200) { throw ('something went wrong') }
        return true;
    } catch (e) {
        return { e };
    }
}

// deleteImage = async (req, res, next) => {
//     try {
//         const filePath = `https://api.dropboxapi.com/2/files/delete_v2`
//         const data = await fetch(filePath, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `${req.headers.authorization}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ path: '/user/' + req.body.path })
//         })
//         if (data.status === 200) { throw ('something went wrong') }
//         return res.status(data.status).send({ data })
//     } catch (e) {
//         return res.status(400).send({ error: e });
//     }
// }