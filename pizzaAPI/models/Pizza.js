const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name:{
        type: String
    },
    toppings:{
        type: [String]
    },
    price:{
        type: Number,
        default: 1
    }
});
module.exports.pizzaSchema = pizzaSchema;
module.exports = mongoose.model('Pizza', pizzaSchema);