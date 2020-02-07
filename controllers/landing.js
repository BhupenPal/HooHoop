const express = require('express');
const Router = express();

Router.get('/', (req, res) => {
    res.render('index')
})

Router.get('/sell-car', (req, res) => {
    res.render('sell_car');
})

Router.get('/buy-car', (req, res) => {
    res.render('buy_car')
})

Router.get('/car-submit', (req, res) => {
    res.render('sell_form')
})

module.exports = Router;