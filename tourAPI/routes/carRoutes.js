const express = require('express');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const router = express();

router.get('/', async (req, res) => {
    try{
        const cars = await Car.find();
        return res.status(200).send({cars})
    }catch(e){
        return res.status(400).send({error: e});
    }
});


router.post('/', async (req, res) => {
    try{
        const {make, model, year, location, price} = req.body;
        if(!make || !model || !year || !location || !price){
            throw('invalid car data');
        }
        await Car.create({make, model, year, location, price});
        return res.status(201).send({message: 'new car created'});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

router.post('/rent', async(req, res) => {
    try{
        const {customerName, customerEmail, car, startDate, endDate} = req.body;
        if(!customerName || !customerEmail || !car){
            throw('invalid details for car booking');
        }
        await Booking.create({customerName, customerEmail, car, startDate, endDate});
        return res.status(201).send({message: "car booked"});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

router.put('/rent/:id', async(req, res) => {
    try{
        const {car, startDate, endDate} = req.body;
        const booking = await Booking.findOneAndUpdate({_id:req.params.id}, {car, startDate, endDate});
        return res.status(200).send({message: 'car booked'});
    }catch(e){
        return res.status(400).send({error: e.message});
    }
});

router.get('/rentals', async (req, res) => {
    try{
        const rentals = await Booking.where("car").exists().populate("car")
        return res.status(200).send({rentals});
    }catch(e){
        return res.status(400).send({error: e});
    }
})

router.get('/rentals/:id', async (req, res) => {
    try{
        if(!req.params.id){
            throw('invalid id');
        }
        const rentals = await Booking.findById(req.params.id).populate("car");
        return res.status(200).send({rentals});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

module.exports = router;