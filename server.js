const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

//Environment Variables
require('dotenv').config();

// Passport Config
const passport = require("passport");
require("./controllers/log/passport")(passport);

//Connect Flash
const flash = require("connect-flash");

//Express-Session Config
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Cache Controller
app.use(function(req, res, next) {
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

//Connect Flash
app.use(flash());

//Global variables for connect-flash
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  if (req.isAuthenticated) {
    res.locals.user = req.user || null;
  }
  next();
});

const landing = require("./controllers/landing");
app.use("/", landing);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server has started at PORT ${PORT}`));
