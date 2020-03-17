const express = require("express");
const Router = express.Router();
const randomstring = require("randomstring");
const transporter = require("./mail/config/trasnport");
const fs = require('fs')

//Authenticator Config
const { ensureAuthenticated, forwardAuthenticated } = require("./log/auth");

//Body-Parser Config
const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({ extended: !1 });

//bcrypt Config
const bcrypt = require("bcryptjs");

//Models Config
const userModel = require("../models/userModel");
const carModel = require("../models/carModel");
const contactModel = require("../models/contactModel");
const testDrive = require("../models/testDrive");
const checkAvail = require("../models/availabilityModel");
const shipModel = require("../models/shippingModel");

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
    successRedirect: req.session.redirectTo || "/",
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
  const isAdmin = true;
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
    const resetToken = null;
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
          active,
          resetToken,
          isAdmin
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            //Save User
            newUser.save();
          })
        );

        let mailOptions = {
          from: '"HooHoop" <contactus@edudictive.in>', // sender address
          to: req.body.email, // list of receivers
          subject: "HooHoop Account Verification Email", // Subject line
          html: mailHTML(req.body.firstName, secretToken) // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          errors.push({ msg: "Email has been sent" });
          res.render("login", { errors });
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

/* EDIT PAGE ROUTE*/
Router.get("/edit-car/:id", ensureAuthenticated, async (req, res) => {
  let car = {};
  car.details = await carModel.find({ _id: req.params.id }).exec();
  res.render("edit_cpage", { car: car.details[0] });
});

Router.post("/edit-car/:id", ensureAuthenticated, urlencoded, async (req, res) => {
    let car = {};
    try {
      let {
        upMake,
        upModel,
        upPrice,
        upMinPrice,
        upTransmission,
        upkMeters,
        upFuelType,
        upSeatNum,
        upEngineSize,
        upBodyType,
        upColour
      } = req.body;

      carModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            Make: upMake.toUpperCase(),
            Model: upModel,
            Price: upPrice,
            minPrice: upMinPrice,
            Transmission: upTransmission,
            kMeters: upkMeters,
            fuelType: upFuelType,
            SeatNum: upSeatNum,
            engineSize: upEngineSize,
            BodyType: upBodyType,
            Colour: upColour
          }
        },
        () => {}
      );
      car.details = await carModel.find({ _id: req.params.id }).exec();
      res.render("edit_cpage", { car: car.details[0] });
    } catch (e) {}
  }
);

//Dashboard Route
Router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard");
});

Router.post("/dashboard/profile", urlencoded, async (req, res) => {
  let { firstName, lastName, phoneNum, address } = req.body;

  let currentUser = await userModel.find({ _id: req.user.id });

  if (!firstName) {
    firstName = currentUser[0].firstName;
  }

  if (!lastName) {
    lastName = currentUser[0].lastName;
  }

  if (!phoneNum) {
    phoneNum = currentUser[0].phoneNum;
  }

  if (!address) {
    address = currentUser[0].address;
  }

  userModel.updateOne(
    { _id: currentUser[0].id },
    {
      $set: {
        firstName: firstName,
        lastName: lastName,
        phoneNum: phoneNum,
        address: address
      }
    },
    () => {}
  );

  res.redirect("/dashboard");
});

Router.post("/dashboard/password-reset", urlencoded, async (req, res) => {
  let errors = [];
  const { originalPass, password, password2 } = req.body;

  let currentUser = await userModel.find({ _id: req.user.id });

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
    res.render("dashboard", { errors });
  } else {
    bcrypt.compare(originalPass, currentUser[0].password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            userModel.updateOne(
              { _id: currentUser[0].id },
              {
                $set: {
                  password: hash
                }
              },
              () => {}
            );
          })
        );
        res.redirect('/dashboard', {success_msg: "Password Updated"})
      } else {
        res.redirect('/dashboard', {errors})
      }
    });
  }
});

Router.get("/user/reset-password", async (req, res) => {
  let errors = [];

  if (req.query.token === undefined) {
    return res.render("forgotPass", { mailSent: false, tokenReceived: false });
  }

  const user = await userModel.findOne({ resetToken: req.query.token }).exec();

  if (!user) {
    errors.push({ msg: "Invalid reset code" });
    res.render("forgotPass", { errors, mailSent: false, tokenReceived: false });
  } else {
    res.render("forgotPass", {
      mailSent: false,
      tokenReceived: req.query.token
    });
  }
});

Router.post("/user/reset-password", urlencoded, async (req, res) => {
  const { email } = req.body;
  let errors = [];

  const user = await userModel.findOne({ email: email }).exec();

  if (!user) {
    errors.push({ msg: "The email is not registered" });
    return res.render("forgotPass", {
      errors,
      mailSent: false,
      tokenReceived: false
    });
  }

  const resetToken = randomstring.generate();
  user.resetToken = resetToken;
  user.save();

  let mailOptions = {
    from: '"HooHoop" <contactus@edudictive.in>', // sender address
    to: req.body.email, // list of receivers
    subject: "HooHoop Account Password Reset", // Subject line
    html: resetMail(user.firstName, resetToken) // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    errors.push({ msg: "Password reset link has been sent to your mail" });
    res.render("forgotPass", { errors, mailSent: true, tokenReceived: false });
  });
});

Router.post("/user/reset-password/reset", urlencoded, async (req, res) => {
  let errors = [];
  let { password, password2, tokenReceived } = req.body;

  const user = await userModel.findOne({ resetToken: tokenReceived });

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
    res.render("forgotPass", {
      errors,
      password,
      password2
    });
  } else {
    //Hash Password
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(password, salt, (err, hash) => {
        //Set password to hashed
        user.password = hash;
        //Save User
        user.save();
      })
    );
    user.resetToken = null;
    user.save();
    errors.push({ msg: "Password reset succesfull" });
    res.render("login", { errors });
  }
});

Router.get('/dashboard/mylistings', async (req, res) => {

  let myList = await carModel.find({ authorID: req.user.id})

  if(req.xhr){
    res.json({list: myList})
  } else {
    res.send('Link not accessible');
  }

})

Router.get('/dashboard/complete-list', async (req, res) => {

  let myList = await carModel.find({})

  if(req.xhr){
    res.json({list: myList})
  } else {
    res.send('Link not accessible');
  }
  
})

Router.get('/dashboard/complete-users', async (req, res) => {

  let allUsers = await userModel.find({})

  if(req.xhr){
    res.json({list: allUsers})
  } else {
    res.send('Link not accessible');
  }
})

Router.get('/dashboard/testdrives', async (req, res) => {
  let TestDrive = await testDrive.find({})

  if(req.xhr){
    res.json({list: TestDrive})
  } else {
    res.send('Link not accessible')
  }
})

Router.get('/dashboard/availcheck', async (req, res) => {
  let CheckAvail = await checkAvail.find({});
  
  if(req.xhr){
    res.json({list: CheckAvail})
  } else {
    res.send("Link not accessible");
  }
})

Router.get('/dashboard/shipenq', async (req, res) => {
  let ShipList = await shipModel.find({});
  
  if(req.xhr){
    res.json({list: ShipList})
  } else {
    res.send("Link not accessible");
  }
})

//Contact Us Routes
Router.get("/contact-us", (req, res) => {
  res.render("contact_us");
});

Router.post("/contact-us", urlencoded, (req, res) => {
  const { name, email, subject, message } = req.body;

  let cModel = new contactModel();
  cModel.fullName = name;
  cModel.email = email;
  cModel.subject = subject;
  cModel.message = message;

  cModel.save();
  res.render("contact_us", {
    success_msg: "The contact form has been submitted"
  });
});

function mailHTML(NameTo, TokenCode) {
  return `<!DOCTYPE html>
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
                <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">Hi ${NameTo},</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin: 0px auto; width: 100%;">Please confirm that you want to use this as your HooHoop account email address. Once it's done you will be able to use HooHoop.</p>
              </td>
            </tr>
            <tr>
              <td style="display: flex !important; justify-content: center !important; align-items: center !important;">
                <a href="http://localhost:8080/user/verify?token=${TokenCode}" style="margin:0 auto"><button id="verify_btn">Verify my email</button></a>
              </td>
            </tr>
            <tr>
              <td><p style="margin: 0 auto; width: 100%; text-align: center;">or paste this link below into your browser: </p></td>
            </tr>
            <tr>
              <td style="display: flex; justify-content: center; align-items: center;"><p style="margin: 0 auto; width: 100%; text-align: center;">http://localhost:8080/user/verify?token=${TokenCode}</p></td>
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
}

function resetMail(NameTo, TokenCode) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      #verify_btn{
        margin: 50px auto; 
        width: 25%;
        min-width: 250px; 
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
                <h1 style="margin: 3vh auto; width: 100%; text-align: center; font-size: 30px;">Reset your password</h1>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">Hi ${NameTo},</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin: 0px auto; width: 100%;">Need to reset your password? No problem! Just click the button below and you'll be on your way. If you did not make this request, please ignore this email.</p>
              </td>
            </tr>
            <tr>
              <td style="display: flex !important; justify-content: center !important; align-items: center !important;">
                <a href="http://localhost:8080/user/reset-password?token=${TokenCode}" style="margin:0 auto"><button id="verify_btn">Reset my password</button></a>
              </td>
            </tr>
            <tr>
              <td><p style="margin: 0 auto; width: 100%; text-align: center;">or paste this link below into your browser: </p></td>
            </tr>
            <tr>
              <td style="display: flex; justify-content: center; align-items: center;"><p style="margin: 0 auto; width: 100%; text-align: center;">http://localhost:8080/user/reset-password?token=${TokenCode}</p></td>
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
}

module.exports = Router;
