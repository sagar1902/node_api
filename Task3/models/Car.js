const mongoose = require('mongoose');
// const Flight = require('./Flight');
// const Hotel = require('./Hotel');
const carSchema = new mongoose.Schema({
    make:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Car', carSchema);