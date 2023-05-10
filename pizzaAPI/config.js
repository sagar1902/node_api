const mongoose = require('mongoose');

const connect = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/PizzaDB');
        console.log('connected to MongoDB');
    }catch(e){
        console.log(e);
    }
}

module.exports = connect;