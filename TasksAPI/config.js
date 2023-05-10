const mongoose = require('mongoose');

const connect = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/Tasks");
        return("connected to DB")
    }catch(e){
        console.log(e);
    }
}

module.exports = connect;