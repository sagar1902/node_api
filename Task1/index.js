const express = require('express');
const connect = require('./config');
connect();

const tasksRoute = require('./tasksRoute');
const app = express();
app.use(express.json());
app.use('/tasks', tasksRoute);

app.listen(4000, ()=>{
    console.log('running...');
});