const express = require('express');
// const mongoose = require('mongoose');
const Tasks = require('./Tasks');

const router = express();

router.get('/', async (req, res)=>{
    try{
        const tasks = await Tasks.find();
        return res.status(200).send({tasks});
    }catch(e){
        return res.status(400).send({error: e})
    }
})


router.post('/', async (req, res)=>{
    try{
        const {title, description} = req.body;
        if(!description || !title){
            throw('invalid task info');
        }
        // const newTask = 
        await Tasks.create({title, description});
        return res.status(201).send({message: 'create new task'});
    }catch(e){
        return res.status(400).send({error: e});
    }
})


router.get('/:id', async (req, res)=>{
    try{
        const task = await Tasks.findById(req.params.id);
        return res.status(200).send({task});
    }catch(e){
        return res.status(400).send({error: e});
    }
});


router.put('/:id', async (req, res)=>{
    try{
        const {title, description} = req.body;
        if(!title || !description){
            throw('invalid update info');
        }
        // const updateTask = 
        await Tasks.findOneAndUpdate({_id:req.params.id}, {title, description});
        return res.status(200).send({message: "task updated successfully"});
    }catch(e){
        return res.status(400).send({error: e});
    }
});


router.delete('/:id', async (req, res)=>{
    try{
        await Tasks.findOneAndDelete({_id:req.params.id});
        return res.status(200).send({message: "task deleted successfully"});
    }catch(e){
        return res.status(400).send({error: e});
    }
});

module.exports = router;