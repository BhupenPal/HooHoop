//Express Config
const express = require('express');
const Router = express.Router();

//Authenticator Config
const { ensureAuthenticated, forwardAuthenticated } = require('./log/auth');

//Body-Parser Config
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ extended: !1 });

//bcrypt Config
const bcrypt = require('bcryptjs');

//Models Config
const userModel = require("../models/userModels");

//Passport Config
const passport = require('passport');

Router.get('/', (req, res) => {
    res.render('index')
})

Router.get('/sell-car', (req, res) => {
    res.render('sell_car');
})

Router.get('/buy-car', (req, res) => {
    res.render('buy_car')
})

Router.get('/login', (req, res) => {
    res.render('login')
})

Router.get('/sign-up', (req, res) => {
    res.render('register')
})

module.exports = Router;