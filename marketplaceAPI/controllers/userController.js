
const User = require('../models/User');
const sendCookie = require('../utils/sendCookie');


exports.getAllUsers = async (req, res)=>{
    try{
        console.log(req.admin)
        const users = await User.find();
        return res.status(200).send({users})
    }catch(e){
        return res.status(400).send({error: e.message});
    }
}


exports.getUserById = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        return res.status(200).send({user})
    }catch(e){
        return res.status(400).send({error: e.message});
    }
}


exports.registerUser = async (req, res)=>{
    try{
        const {name, email, password, username} = req.body;
        await User.create({name, email, password, username})
        return res.status(201).send({message: 'created user'})
    }catch(e){
        return res.status(400).send({error: e});
    }
}


exports.loginUser = async (req, res) => {
    try{
        const {userID, password} = req.body;
        console.log(userID, password)
        const user = await User.findOne({
            $or:[{email:userID}, {username:userID}]
        }).select('+password');
        if(!user || !user.comparePassword(password)){throw('user not found')}
        sendCookie(user, 200, res);
    }catch(e){
        return res.status(400).send({error: e});
    }
}