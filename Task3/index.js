const express = require('express');
const flightRoutes = require('./routes/flightRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const packageRoutes = require('./routes/packageRoutes');
const carRoutes = require('./routes/carRoutes');
const connect = require('./connect');
connect();
const app = express();
app.use(express.json());

app.use('/flights', flightRoutes);
app.use('/hotels', hotelRoutes);
app.use('/packages', packageRoutes);
app.use('/cars', carRoutes);

app.listen(4000, ()=>{
    console.log('started server');
})