const mongoose = require('mongoose');

const connect = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/flightDB");
        console.log("connected to database");
    }catch(e){
        console.log('connection distorted');
    }
}

module.exports = connect;