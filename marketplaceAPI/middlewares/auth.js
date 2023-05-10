const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Admin = require('../models/Admin');
const createLog = require('../utils/createLog');
// const ErrorHandler = require("../utils/errorHandler");
// const catchAsync = require("./catchAsync");

// exports.isAuthenticated = catchAsync(async (req, res, next) => {

//     const { token } = req.cookies;

//     if(!token) {
//         return next(new ErrorHandler("Please Login to Access", 401));
//     }

//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decodedData.id);
//     next();
// });

exports.isAuthenticated = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            // return res.status(403).send({message: "Unauthorized"});
            throw('unauthorized user');
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        if(!createLog(req, decodedData)){throw('error creating log')}
        next();
    }catch(e){
        return res.status(400).send({error: e})
    }
}


exports.isAdmin = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        decodedData = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
        req.admin = await Admin.findById(decodedData.id);
        next();
    }catch(e){
        return res.status(400).send({error: e});
    }
}