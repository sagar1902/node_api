const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected to MongoDB');
    } catch (e) {
        console.log('failed to connect to MongoDB');
    }
}

module.exports = connectDB;