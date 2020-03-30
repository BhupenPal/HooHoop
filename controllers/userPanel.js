const express = require("express");
const Router = express.Router();
const randomstring = require("randomstring");
const transporter = require("./mail/config/trasnport");
const mdq = require('mongo-date-query');
var schedule = require('node-schedule');
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
const couponModel = require("../models/couponModel");
const sellqueModel = require("../models/sellqueryModel");

var j = schedule.scheduleJob('0 0 * * *', async function(){
  await couponModel.deleteMany({createdAt: mdq.previousDays(3)})
});

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
  const isAdmin = false;
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
        userModel.findOne({phoneNum: phoneNum}).then( userFinal => {
          if(userFinal){
            errors.push({msg: "Phone number already exists"});
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
              from: '"HooHoop" <contact@hoohoop.co.nz.in>', // sender address
              to: req.body.email, // list of receivers
              subject: "HooHoop Account Verification Email", // Subject line
              html: mailHTML(req.body.firstName, secretToken) // html body
            };
    
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              success_msg = "Email has been sent"
              res.render("login", { success_msg });
            });
          }
        })
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
});

//Dashboard Route
Router.get("/dashboard", ensureAuthenticated, (req,res) => {
  res.redirect("/dashboard/profile")
})

Router.get("/dashboard/:sec", ensureAuthenticated, (req, res) => {
  if(req.params.sec == "account"){
    res.render("d_account")
  }
  else if(req.params.sec == "listings"){
    res.render("d_u_listing")
  }
  else if(req.params.sec == "all-listings"){
    res.render("d_all_listing")
  }
  else if(req.params.sec == "client-management"){
    res.render("d_reqpanel")
  }
  else if(req.params.sec == "all-client-management"){
    res.render("d_allreq")
  }
  else if(req.params.sec == "user-management"){
    res.render("d_user_man")
  }
  else if(req.params.sec == "offers"){
    res.render("d_user_off")
  }
  else if(req.params.sec == "trade-requests"){
    res.render("d_tr_req")
  }
  else if(req.params.sec == "profile"){
    res.render("d_profile")
  }
  else{
    res.redirect("/dashboard/profile")
  }
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

  res.redirect("/dashboard/profile");
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
  let allUsers = await userModel.find({isAdmin: {$ne: true}})
  if(req.xhr){
    res.json({list: allUsers})
  } else {
    res.send('Link not accessible');
  }
})

Router.post('/dashboard/user/delete', urlencoded, async (req, res) => {
  await userModel.deleteOne({ _id: req.body.deleteAd})
  res.redirect(req.header('Referer'))
})

Router.get('/dashboard/testdrives', async (req, res) => {
  let TestDrive = await testDrive.find({carAuthor: `${req.user.firstName} ${req.user.lastName}`})

  if(req.xhr){
    res.json({list: TestDrive})
  } else {
    res.send('Link not accessible')
  }
})

Router.get('/dashboard/testdrives-all', async (req, res) => {
  let TestDrive = await testDrive.find({carAuthor: {$ne: `${req.user.firstName} ${req.user.lastName}`}})
  
  if(req.xhr){
    res.json({list: TestDrive})
  } else {
    res.send('Link not accessible')
  }
})

Router.get('/dashboard/availcheck', async (req, res) => {
  let CheckAvail = await checkAvail.find({carAuthor: `${req.user.firstName} ${req.user.lastName}`});
  
  if(req.xhr){
    res.json({list: CheckAvail})
  } else {
    res.send("Link not accessible");
  }
})

Router.get('/dashboard/availcheck-all', async (req, res) => {
  let CheckAvail = await checkAvail.find({carAuthor: {$ne: `${req.user.firstName} ${req.user.lastName}`}});
  
  if(req.xhr){
    res.json({list: CheckAvail})
  } else {
    res.send("Link not accessible");
  }
})

Router.get('/dashboard/shipenq', async (req, res) => {
  let ShipList = await shipModel.find({carAuthor: `${req.user.firstName} ${req.user.lastName}`});
  
  if(req.xhr){
    res.json({list: ShipList})
  } else {
    res.send("Link not accessible");
  }
})

Router.get('/dashboard/shipenq-all', async (req, res) => {
  let ShipList = await shipModel.find({carAuthor: {$ne: `${req.user.firstName} ${req.user.lastName}`}});
  
  if(req.xhr){
    res.json({list: ShipList})
  } else {
    res.send("Link not accessible");
  }
})

Router.post('/dashboard/testdrive/delete', urlencoded, async (req, res) => {
  await testDrive.deleteOne({ _id: req.body.deleteAd})
  res.redirect(req.header('Referer'));
})

Router.post('/dashboard/testdrive/update', urlencoded, async (req, res) => {
  const Test = await testDrive.find({ _id: req.body.adSOLD})
  if(Test[0].status){
    await testDrive.updateOne({ _id: req.body.adSOLD}, {$set: { status: false}}, () => {})
  } else {
    await testDrive.updateOne({ _id: req.body.adSOLD}, {$set: { status: true }}, () => {})
  }

  res.redirect(req.header('Referer'));
})

Router.post('/dashboard/availability/delete', urlencoded, async (req, res) => {
  await checkAvail.deleteOne({ _id: req.body.deleteAd})
  res.redirect(req.header('Referer'));
})

Router.post('/dashboard/availability/update', urlencoded, async (req, res) => {
  const Test = await checkAvail.find({ _id: req.body.adSOLD})
  if(Test[0].status){
    await checkAvail.updateOne({ _id: req.body.adSOLD}, {$set: { status: false}}, () => {})
  } else {
    await checkAvail.updateOne({ _id: req.body.adSOLD}, {$set: { status: true }}, () => {})
  }

  res.redirect(req.header('Referer'));
})

Router.post('/dashboard/shipment/delete', urlencoded, async (req, res) => {
  await shipModel.deleteOne({ _id: req.body.deleteAd})
  res.redirect(req.header('Referer'));
})

Router.post('/dashboard/shipment/update', urlencoded, async (req, res) => {
  const Test = await shipModel.find({ _id: req.body.adSOLD})
  if(Test[0].status){
    await checkAvail.updateOne({ _id: req.body.adSOLD}, {$set: { status: false}}, () => {})
  } else {
    await checkAvail.updateOne({ _id: req.body.adSOLD}, {$set: { status: true }}, () => {})
  }

  res.redirect(req.header('Referer'));
})

/* FORGOT PASSWORD */
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
    from: '"HooHoop" <contact@hoohoop.co.nz.in>', // sender address
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
    res.render("login", { success_msg: "Password reset succesfull"});
  }
});


Router.post('/chatbot/submit', bodyParser.json(), async (req, res) => {
  let NewCoupon = new couponModel;
  let NewSellQue = new sellqueModel;

  let result = await carModel.find({_id: req.body.discountFor});
  
  NewCoupon.custEmail = req.body.email;
  NewCoupon.custPhone = req.body.phoneNo;
  NewCoupon.couponCode = req.body.CouponCode;
  NewCoupon.vehicleID = result[0].vinNum;
  NewCoupon.vehicleName = `${result[0].Make} - ${result[0].Model}`;
  NewCoupon.couponAmount = req.body.discount;
  NewCoupon.validFrom = req.body.tod;
  NewCoupon.validTo = req.body.tom;
  NewCoupon.save();
    
  NewSellQue.custEmail = req.body.email;
  NewSellQue.custPhone = req.body.phoneNo;
  NewSellQue.custVIN = req.body.carID;
  NewSellQue.discountFor = `${result[0].Make} - ${result[0].Model}`;
  NewSellQue.custDiscount = req.body.discount;
  NewSellQue.custDiscDate = req.body.tod;
  NewSellQue.status = "Active";
  NewSellQue.save();

  let mailOptions = {
    from: '"HooHoop" <contact@hoohoop.co.nz.in>', // sender address
    to: req.body.email, // list of receivers
    subject: "HooHoop Discount Coupon Code", // Subject line
    html: discountMail(`${result[0].Make} - ${result[0].Model}`, req.body.discount, result[0].DealerName, result[0].DealerEmail, result[0].DealerNum, req.body.CouponCode) // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }})

  res.send('Done')
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
    <table width="60%" cellspacing="0" cellpadding="0" style="background-color: #F0F2F5; padding: 80px; margin: 0 auto;">
      <tr>
        <td>
          <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: Arial; padding: 20px;">
            <!-- Header -->
            <tr>
              <td><img src="http://18.217.77.229/assets/images/Logo.png" alt="HooHoop Logo" style="display: block; margin: 10px auto; padding: 0; width: 300px;"></td>
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
                <a href="http://18.217.77.229/user/verify?token=${TokenCode}" style="margin:0 auto"><button id="verify_btn">Verify my email</button></a>
              </td>
            </tr>
            <tr>
              <td><p style="margin: 0 auto; width: 100%; text-align: center;">or paste this link below into your browser: </p></td>
            </tr>
            <tr>
              <td style="display: flex; justify-content: center; align-items: center;"><p style="margin: 0 auto; width: 100%; text-align: center;">http://18.217.77.229/user/verify?token=${TokenCode}</p></td>
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
    <table width="60%" cellspacing="0" cellpadding="0" style="background-color: #F0F2F5; padding: 80px; margin: 0 auto;">
      <tr>
        <td>
          <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: Arial; padding: 20px;">
            <!-- Header -->
            <tr>
              <td><img src="http://18.217.77.229/assets/images/Logo.png" alt="HooHoop Logo" style="display: block; margin: 10px auto; padding: 0; width: 300px;"></td>
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
                <a href="http://18.217.77.229/user/reset-password?token=${TokenCode}" style="margin:0 auto"><button id="verify_btn">Reset my password</button></a>
              </td>
            </tr>
            <tr>
              <td><p style="margin: 0 auto; width: 100%; text-align: center;">or paste this link below into your browser: </p></td>
            </tr>
            <tr>
              <td style="display: flex; justify-content: center; align-items: center;"><p style="margin: 0 auto; width: 100%; text-align: center;">http://18.217.77.229/user/reset-password?token=${TokenCode}</p></td>
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

function discountMail(CouponCar, deal, sellerName, SellerMail, sellerPhone, CouponCode) {
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
    <table width="60%" cellspacing="0" cellpadding="0" style="background-color: #F0F2F5; padding: 80px; margin: 0 auto;">
      <tr>
        <td>
          <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff; font-family: Arial; padding: 20px;">
            <!-- Header -->
            <tr>
              <td><img src="http://18.217.77.229/assets/images/Logo.png" alt="HooHoop Logo" style="display: block; margin: 10px auto; padding: 0; width: 300px;"></td>
            </tr>
            <tr>
              <td>
                <h1 style="margin: 3vh auto 1vh auto; width: 100%; text-align: center; font-size: 30px;">Your Coupon Code</h1>
                <h3 style="margin: 1vh auto 3vh auto; width: 100%; text-align: center; font-size: 18px;">for <span style="color: #1EA1F3;">${CouponCar}</span></h3>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin: 0px auto; width: 100%; font-weight: bold; font-size: 20px; margin-bottom: 10px;">Hello,</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin: 0px auto; width: 100%;">Here's your $${deal} discount coupoun code. The coupon code is valid only for 72-Hours. You can 
                contact ${sellerName}, <br> ${SellerMail}, <br> ${sellerPhone}</p>
              </td>
            </tr>
            <tr>
              <td style="display: flex !important; justify-content: center !important; align-items: center !important;">
                <a href="#" style="margin:0 auto"><button id="verify_btn">${CouponCode}</button></a>
              </td>
            </tr>
            <tr>
              <td><p style="margin: 0 auto; width: 100%; text-align: center;">Visit <a href="http://18.217.77.229/" style="margin:0 auto">HooHoop.com</a> for any further details.</p></td>
            </tr>
            <tr>
              <td style="display: flex; justify-content: center; align-items: center;"><p style="margin: 0 auto; width: 100%; text-align: center;">http://18.217.77.229/</p></td>
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
