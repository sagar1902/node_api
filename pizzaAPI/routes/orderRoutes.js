const express = require('express');
const Order = require('../models/Order');
const router = express();

router.get('/', async (req, res) => {
    try{
        const orders = await Order.find();
        return res.status(200).send({orders});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const _id = req.params.id;
        if(!_id){
            throw('invalid id');
        }
        const order = await Order.findById(_id).populate({
            path: 'pizzas',
            populate: {
                path: 'pizza'
            }
        })
        return res.status(200).send({order})
        if(order.length === 1){
            return res.status(200).send({order})
        }
    }catch(e){
        return res.status(400).send({error: e});
    }
})


router.post('/', async (req, res) => {
    try{
        const {pizzas, total} = req.body;
        await Order.create({pizzas, total});
        return res.status(201).send({message: 'Order created successfully'});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

module.exports = router;