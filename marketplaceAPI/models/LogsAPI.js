const mongoose = require('mongoose');

const API_logs = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    api:[{
        reqMethod: {type:String, required: true},
        reqUrl: {type:String, required: true},
        calledAt: {type:Date, default: Date.now()}
    }]
});

module.exports = mongoose.model('api_logs', API_logs);