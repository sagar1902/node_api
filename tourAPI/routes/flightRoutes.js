const express = require('express');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const router = express();


router.post('/', async (req, res) => {
    try{
        const {airline, departureAirport, arrivalAirport, departureTime, arrivalTime, price} = req.body;
        if(!airline || !departureAirport || !arrivalAirport || !departureTime || !arrivalTime || !price){
            throw("invalid Flight details");
        }
        await Flight.create({airline, departureAirport, arrivalAirport, departureTime, arrivalTime, price});
        return res.status(201).send({message: "new flight created"});
    }catch(e){
        return res.status(400).send({error: e});
    }
})


router.get('/', async (req, res) => {
    try{
        const flights = await Flight.find();
        return res.status(200).send({flights});
    }catch(e){
        return res.status(400).send({error: e});
    }
});


router.post('/book', async (req, res) => {
    try{
        const {customerName, customerEmail, flight} = req.body;
        if(!customerName || !customerEmail || !flight){
            throw("invalid Flight details");
        }
        await Booking.create({customerName, customerEmail, flight});
        return res.status(201).send({message: "flight booked"});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

router.put('/book/:id', async(req, res) => {
    try{
        const {flight} = req.body;
        if(!flight){
            throw('invalid details for flight booking');
        }
        const booking = await Booking.findOneAndUpdate({_id:req.params.id}, {flight});
        return res.status(200).send({message: 'flight booked'});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

router.get('/bookings', async (req, res) => {
    try{
        const bookings = await Booking.where("flight").exists().populate("flight")
        return res.status(200).send({bookings});
    }catch(e){
        return res.status(400).send({error: e});
    }
})

router.get('/bookings/:id', async (req, res) => {
    try{
        if(!req.params.id){
            throw('invalid id');
        }
        const booking = await Booking.findById(req.params.id).populate("flight");
        return res.status(200).send({booking});
    }catch(e){
        return res.status(400).send({error: e});
    }
});
module.exports = router;