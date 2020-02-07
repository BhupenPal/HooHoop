//Express Config
const express = require('express');
const Router = express.Router();
const carjam = require('./carjam');

/* HOME ROUTES */
Router.get('/', (req, res) => {
    res.render('index')
})

/* SELL YOUR CAR ROUTES*/
Router.get('/sell-car', (req, res) => {
    res.render('sell_car');
})

Router.get('/car-submit', (req, res) => {
    res.render('sell_form', {vinFigured: false, detailedCarObject: false})
})

Router.use('/', carjam);

/* BUY CAR ROUTES */
Router.get('/buy-car', (req, res) => {
    res.render('buy_car')
})

/* USER PANEL ROUTES*/
Router.get('/login', (req, res) => {
    res.render('login')
})

Router.get('/sign-up', (req, res) => {
    res.render('register')
})


module.exports = Router;