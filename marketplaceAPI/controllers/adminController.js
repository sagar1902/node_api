
const Admin = require('../models/Admin');
const sendCookie = require('../utils/sendCookie');


// exports.getAllUsers = async (req, res)=>{
//     try{
//         console.log('admin controller')
//         const users = await User.find();
//         return res.status(200).send({users})
//     }catch(e){
//         return res.status(400).send({error: e.message});
//     }
// }


// exports.getUserById = async (req, res)=>{
//     try{
//         const user = await User.findById(req.params.id);
//         return res.status(200).send({user})
//     }catch(e){
//         return res.status(400).send({error: e.message});
//     }
// }


exports.registerAdmin = async (req, res)=>{
    try{
        // console.log(req.admin, req.user)
        const {password, username} = req.body;
        await Admin.create({password, username})
        return res.status(201).send({message: 'created admin'})
    }catch(e){
        return res.status(400).send({error: e});
    }
}


exports.loginAdmin = async (req, res) => {
    try{
        const {username, password} = req.body;
        const admin = await Admin.findOne({username}).select('+password');
        console.log(admin)
        if(!admin || !admin.comparePassword(password)){throw('user not found')}
        sendCookie(admin, 200, res);
    }catch(e){
        return res.status(400).send({error: e});
    }
}