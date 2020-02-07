
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
