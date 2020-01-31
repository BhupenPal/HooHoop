const express = require('express');
const Router = express();

Router.get('/', (req, res) => {
    res.render('index')
})

Router.get('/sell-car', (req, res) => {
    res.render('sell_car');
})

module.exports = Router;