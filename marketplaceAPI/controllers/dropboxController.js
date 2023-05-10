
const fetch = require('node-fetch');
const {UniqueString}  = require('unique-string-generator');
const Product = require('../models/Product');


exports.getImage = async (req, res, next) => {
    const filePath = `https://content.dropboxapi.com/2/files/download?arg={"path":"/user/${req.params.filename}"}`;
    try {
        const fileData = await fetch(filePath, {
            method: 'POST',
            headers: {
                'Authorization': `${req.headers.authorization}`,
            },
        });
        if (fileData.status !== 200) {
            throw new Error('Failed to retrieve file');
        }
        const img = await fileData.buffer();
        // console.log(img)
        res.send({img});
    } catch (error) {
        next(error);
    }
}

exports.uploadImage = async (req, res, next) => {
    // no headers needed
    // headers: auth bearer access token
    //body: form: name, user_id, files:singlefile
    try{
        const filename = UniqueString()+'.'+req.files[0].originalname.split(".")[1]
        const filePath = `https://content.dropboxapi.com/2/files/upload?arg={"path":"/user/${filename}"}`
        const data = await fetch(filePath, {
            method: 'POST',
            headers:{
                'Authorization': `${req.headers.authorization}`,
                'Content-Type': 'application/octet-stream'
            },
            body:req.files[0].buffer
        });
        await Product.create({name:req.body.name, image:filename, createdBy:req.body.user_id})
        return res.status(201).send({data});
    }catch(e){
        if(e.message.split(' '[1] == 'Product')){
            // logic to rollback dropbox upload
        }
        return res.status(400).send({error:e});
    }
}


exports.deleteImage = async (req, res, next) => {
    try{
        const filePath = `https://api.dropboxapi.com/2/files/delete_v2`
        const data = await fetch(filePath, {
            method: 'POST',
            headers: {
                'Authorization': `${req.headers.authorization}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({path:'/user/'+req.body.path})
        })
        if(data.status===200){throw('something went wrong')}
        return res.status(data.status).send({data})
    }catch(e){
        return res.status(400).send({error:e});
    }
}