const express = require('express');
const Pizza = require('../models/Pizza');
const router = express();

router.get('/', async (req, res) => {
    try{
        const menu = await Pizza.find();
        return res.status(200).send({menu});
    }catch(e){
        return res.status(400).send({error: e});
    }
});


router.post('/', async (req, res) => {
    try{
        const {name, toppings, price} = req.body;
        if(!name || !toppings || !price){
            throw('invalid pizza information');
        }
        await Pizza.create({name, toppings, price});
        return res.status(201).send({message: 'new pizza added to menu'})
    }catch(e){
        return res.status(400).send({error: e});
    }
});

module.exports = router;