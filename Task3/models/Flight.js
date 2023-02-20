const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airline:{
        type: String,
        required: true
    },
    departureAirport:{
        type: String,
        required: true
    },
    arrivalAirport:{
        type: String,
        required: true
    },
    departureTime:{
        type: String,
        required: true
    },
    arrivalTime:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Flight', flightSchema);