const express = require('express');
// const User = require('../models/User');
const { registerAdmin, loginAdmin} = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
// const sendCookie = require('../utils/sendCookie');
const router = express();


// NO AUTH ROUTES
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);


// USER AUTH ROUTES
// router.get('/me', ()=>{console.log('hi')})


// ADMIN AUTH ROUTES
// router.route('/').get(isAdmin, getAllUsers);


// EXCEPTION ROUTES
router.route('*')
        .get((req, res)=>{res.status(404).send('you might have entered the wrong route or method')})
        .post((req, res)=>{res.status(404).send('you might have entered the wrong route or method')})
        .delete((req, res)=>{res.status(404).send('you might have entered the wrong route or method')})
        .put((req, res)=>{res.status(404).send('you might have entered the wrong route or method')})
        .patch((req, res)=>{res.status(404).send('you might have entered the wrong route or method')})


module.exports = router;