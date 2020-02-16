const express = require("express");
const Router = express.Router();

//Authenticator Config
const { ensureAuthenticated, forwardAuthenticated } = require("./log/auth");

//Body-Parser Config
const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({ extended: !1 });

//bcrypt Config
const bcrypt = require("bcryptjs");

//Models Config
const userModel = require("../models/userModel");

//Passport Config
const passport = require("passport");
require("./log/passport")(passport);

// Passport middleware
Router.use(passport.initialize());
Router.use(passport.session());

//SELL CAR FORM ROUTE
Router.get("/car-submit", ensureAuthenticated, (req, res) => {
  res.render("sell_form", { vinFigured: false, detailedCarObject: false });
});

//Login Route
Router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

Router.post("/login", urlencoded, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
});

//Register Route
Router.get("/sign-up", (req, res) => {
  res.render("register");
});

Router.post("/sign-up", urlencoded, (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNum,
    password,
    password2,
    address
  } = req.body;
  let errors = [];

  //Check required fields
  if (!firstName || !lastName || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  //Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters" });
  }

  if (password.length > 14) {
    errors.push({ msg: "Password length should not exceed 14 characters" });
  }

  //Check password strength
  if (!password.match(/[a-z]/)) {
    errors.push({ msg: "Password must contain a Lowercase Letter." });
  }

  if (!password.match(/[A-Z]/)) {
    errors.push({ msg: "Password must contain a Uppercase Letter." });
  }

  if (!password.match(/[0-9]/)) {
    errors.push({ msg: "Password must contain a Numeric Digit." });
  }

  if (!password.match(/[\W]/)) {
    errors.push({ msg: "Password must contain a Special Character." });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      firstName,
      lastName,
      email,
      phoneNum,
      password,
      password2
    });
  } else {
    userModel.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          firstName,
          lastName,
          email,
          phoneNum,
          password,
          password2,
          address
        });
      } else {
        const newUser = new userModel({
          firstName,
          lastName,
          phoneNum,
          email,
          password,
          address
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            //Save User
            newUser
              .save()
              .then(user => {
                res.redirect("/login");
              })
              .catch(err => {
                console.log(err);
                console.log(errors);
              });
          })
        );
      }
    });
  }
});

//Logout Route
Router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/login");
});

//Dashboard Route
Router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", { userName: req.user.firstName });
});

module.exports = Router;
