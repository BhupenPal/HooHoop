const express = require("express");
const Router = express.Router();
const randomstring = require('randomstring');
const transporter = require('./mail/config/trasnport');

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


/* SELL YOUR CAR ROUTES*/
Router.get("/sell-car", (req, res) => {
  res.render("sell_car");
});

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
    successRedirect: (req.session.redirectTo || '/'),
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
    const secretToken = randomstring.generate();
    const active = false;
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
          address,
          secretToken,
          active
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            //Save User
            newUser.save()
          })
        );

        let mailHTML = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
            #verify_btn{
              margin: 50px auto; 
              width: 25%;
              min-width: 150px; 
              height: 50px; 
              border-radius: 50px; 
              border: none; 
              text-align: center; 
              background-color: #1EA1F3; 
              color: white;
              font-size: large; 
              cursor: pointer;
              transition: 0.2s;
              outline: 0;
            }
            #verify_btn:hover{
              background-color: white;
              border: 2px solid #1EA1F3;
              color: #1EA1F3;
            }
          </style>
        </head>
        <body>
          <table width="60%" cellsapcing="0" cellpadding="0" style="background-color: #F0F2F5; padding: 80px; margin: 0 auto;">
            <tr>
              <td>
                <table width="100%" cellsapcing="0" cellpadding="0" style="background-color: #fff; font-family: Arial; padding: 20px;">
                  <!-- Header -->
                  <tr>
                    <td><img src="./Logo.png" alt="HooHoop Logo" style="display: block; margin: 10px auto; padding: 0; width: 300px;"></td>
                  </tr>
                  <tr>
                    <td>
                      <h1 style="margin: 3vh auto; width: 100%; text-align: center; font-size: 30px;">Verify your email address</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">Hi ${req.body.firstName},</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 0px auto; width: 100%;">Please confirm that you want to use this as your HooHoop account email address. Once it's done you will be able to use HooHoop.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="display: flex !important; justify-content: center !important; align-items: center !important;">
                      <a href="http://localhost:8080/user/verify?token=${secretToken}" style="margin:0 auto"><button id="verify_btn">Verify my email</button></a>
                    </td>
                  </tr>
                  <tr>
                    <td><p style="margin: 0 auto; width: 100%; text-align: center;">or paste this link below into your browser: </p></td>
                  </tr>
                  <tr>
                    <td style="display: flex; justify-content: center; align-items: center;"><p style="margin: 0 auto; width: 100%; text-align: center;">http://localhost:8080/user/verify?token=${secretToken}</p></td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>`;

        let mailOptions = {
          from: '"HooHoop" <contactus@edudictive.in>', // sender address
          to: req.body.email, // list of receivers
          subject: 'HooHoop Account Verification Email', // Subject line
          html: mailHTML // html body
      };
    
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          errors.push({ msg: "Email has been sent" });
          res.render('login', {errors});
      });

      }
    });
  }
});

//Logout Route
Router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

//Dashboard Route
Router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard");
});

module.exports = Router;
