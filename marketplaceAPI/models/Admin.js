const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username already exists'],
        minLength: [8, 'username too short'],
        match: [/^[a-z A-Z 0-9]+$/, 'invalid username']
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: [true, 'email registred'],
    //     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'invalid email'],
    //     lowercase: true,
    //     trim: true
    // },
    password: {
        type: String,
        required: [true, 'password cannot be empty'],
        minLength: [8, 'password length too small'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid format for password'],
    }
});

adminSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

adminSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

adminSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_ADMIN_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

module.exports = mongoose.model('Admin', adminSchema);