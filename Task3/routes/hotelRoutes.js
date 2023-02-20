const express = require('express');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const router = express();

router.get('/', async (req, res) => {
    try{
        const hotels = await Hotel.find();
        return res.status(200).send({hotels})
    }catch(e){
        return res.status(400).send({error: e});
    }
});


router.post('/', async (req, res) => {
    try{
        const {name, city, address, price} = req.body;
        if(!name || !city || !address || !price){
            throw('invalid hotel data');
        }
        await Hotel.create({name, city, address, price})
        return res.status(201).send({message: 'new hotel created'});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

router.post('/book', async(req, res) => {
    try{
        const {customerName, customerEmail, hotel} = req.body;
        if(!customerName || !customerEmail || !hotel){
            throw('invalid details for hotel booking');
        }
        await Booking.create({customerName, customerEmail, hotel});
        return res.status(201).send({message: "hotel booked"});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

router.put('/book/:id', async(req, res) => {
    try{
        const {hotel} = req.body;
        if(!hotel){
            throw('invalid details for hotel booking');
        }
        const booking = await Booking.findOneAndUpdate({_id:req.params.id}, {hotel});
        return res.status(200).send({message: 'hotel booked'});
    }catch(e){
        return res.status(400).send({error: e.message});
    }
});

router.get('/bookings', async (req, res) => {
    try{
        const bookings = await Booking.where("hotel").exists().populate("hotel")
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
        const booking = await Booking.findById(req.params.id).populate("hotel");
        return res.status(200).send({booking});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

module.exports = router;