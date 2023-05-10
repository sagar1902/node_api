const mongoose = require('mongoose');
const Flight = require('./Flight');
const Hotel = require('./Hotel');
const Car = require('./Car');
const bookingSchema = new mongoose.Schema({
    customerName:{
        type: String,
        required: true
    },
    customerEmail:{
        type: String,
        required: true
    },
    flight:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
        // required: true
    },
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        // required: true
    },
    car:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
    },
    startDate:{
        type: String,
    },
    endDate:{
        type: String,
    },
    totalPrice:{
        type: Number,
        // required: true
    }
})

bookingSchema.pre("save", async function(next) {
    if(this.isModified("flight") || this.isModified("hotel") || this.isModified("car")) {
        const flightPrice = this.flight? (await Flight.findById(this.flight)).price : 0;
        const hotelPrice = this.hotel? (await Hotel.findById(this.hotel)).price : 0;
        const carPrice = this.car? (await Car.findById(this.car)).price : 0;
        this.totalPrice = (flightPrice + hotelPrice + carPrice) || 0;
    }
    next();
});


// bookingSchema.pre('findOneAndUpdate', async function (next) {
//     const update = this.getUpdate();
//     const docToUpdate = this._update.$set;
//     docToUpdate.totalPrice += update.totalPrice
//     next();
//   });

module.exports = mongoose.model('Booking', bookingSchema);