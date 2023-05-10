const mongoose = require('mongoose');
const pizzaSchema = require('./Pizza');
// const Pizza = require('./Pizza');

// const PizzasSchema = new mongoose.Schema({
//     pizza:{
//         type: Pizza,
//         required: true
//     },
//     toppings:{
//         type: [String],
//         required: true
//     }
// })

const OrderSchema = new mongoose.Schema({
    pizzas: [
        {
            pizza: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Pizza',
                required: true
            },
            toppings:[
                {
                    type: String
                }
            ]
        }
    ],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Order', OrderSchema);