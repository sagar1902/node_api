const express = require('express');
const Booking = require('../models/Booking');
const router = express();

router.get('/', async (req, res) => {
    try{
        const bookings = await Booking.find().populate("car hotel flight");
        return res.status(200).send({bookings});
    }catch(e){
        return res.status(400).send({error: e.message});
    }
});

module.exports = router;