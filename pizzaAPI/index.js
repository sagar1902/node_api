const express = require('express');
const connect = require('./config');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
connect();

const app = express();
app.use(express.json());
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);

app.listen(4000, ()=>{
    console.log('listening on 4000')
});