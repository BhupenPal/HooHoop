const express = require("express");
const Router = express.Router();
const carModel = require("../models/carModel");
const userModel = require("../models/userModel");

const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({ extended: !1 });

const {ensureAuthenticated} = require('./log/auth');

const testDrive = require("../models/testDrive");
const availabilityModel = require("../models/availabilityModel");
const shippingModel = require("../models/shippingModel");

Router.get('/search-car', (req, res) => {
  if(!req.query.item){
    res.redirect('/search-car/1')
  } else if(req.query.item){
    const regex = new RegExp(escapeRegex(req.query.item), 'gi');
    carModel.find( {$or: [ { Make: regex }, { Model: regex } ] }, function(err, allCars){
      if(err){
          console.log(err);
      } else {
         if(allCars.length < 1) {
             noMatch = "No matching query";
         }
         res.render("buy_car",{record: allCars});
      }
   });
  }
})

Router.get("/search-car/:page", Paginator(carModel), async (req, res) => {
    res.render("buy_car", { record: res.Paginator.results });
});

Router.get('/filter-content/:page', Paginator(carModel), async (req, res) => {

  if(req.xhr){
    res.json({record: res.Paginator.results})
  }
  res.send('Link not accessible');
  
})

Router.get("/buy-car/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let result = await carModel.find({ _id: id }).exec();
    let views = result[0].views + 1;
    carModel.updateOne({ _id: id }, { $set: { views: views } }, () => {});
    let seller = await userModel.find({_id : result[0].authorID})
    res.render("cpage_info", { record: result[0], seller: seller[0] });
  } catch (e) {}
});

Router.post("/buy-car/:vID/book-test-drive", urlencoded, async (req, res) => {
  let vID = req.params.vID;

  const bookTestDrive = new testDrive();

  let result = await carModel.find({ _id: vID }).exec();

  bookTestDrive.firstName = req.body.ft_name;
  bookTestDrive.lastName = req.body.lt_name;
  bookTestDrive.email = req.body.bt_email;
  bookTestDrive.phoneNum = req.body.pt_phone;

  if(req.user){
    bookTestDrive.customerID  = req.user._id;
  } else if(!req.user){
    bookTestDrive.customerID  = "Not Logged In";
  }

  bookTestDrive.vehicleID = vID;

  bookTestDrive.save();

  res.render("cpage_info", {record: result[0]});
});

Router.post("/buy-car/:vID/check-availbility", urlencoded, async (req, res) => {
  let vID = req.params.vID;

  const checkAvailabilityModel = new availabilityModel();

  let result = await carModel.find({ _id: vID }).exec();

  checkAvailabilityModel.fullName = req.body.ck_name;
  checkAvailabilityModel.email = req.body.ck_email;
  checkAvailabilityModel.phoneNum = req.body.ck_phone;
  if(req.user){
    checkAvailabilityModel.customerID  = req.user._id;
  } else if(!req.user){
    checkAvailabilityModel.customerID  = "Not Logged In";
  }
  checkAvailabilityModel.vehicleID = vID;

  checkAvailabilityModel.save();

  res.render("cpage_info", {record: result[0]});
});

Router.post("/buy-car/:vID/shipping-quote", urlencoded, async (req, res) => {
  let vID = req.params.vID;

  const shippingQuote = new shippingModel();

  let result = await carModel.find({ _id: vID }).exec();

  shippingQuote.fullName = req.body.sq_name;
  shippingQuote.email = req.body.sq_email;
  shippingQuote.phoneNum = req.body.sq_phone;
  shippingQuote.fromLocation = req.body.wh_move_from;
  shippingQuote.toLocation = req.body.wh_move_to;
  shippingQuote.transportDate = req.body.wh_date;
  shippingQuote.note = req.body.wh_question;
  if(req.user){
    shippingQuote.customerID  = req.user._id;
  } else if(!req.user){
    shippingQuote.customerID  = "Not Logged In";
  }
  shippingQuote.vehicleID = vID;

  shippingQuote.save();

  res.render("cpage_info", {record: result[0]});
});


Router.get("/my-ads", ensureAuthenticated, async (req, res) => {
  const myAds = {};
  myAds.listing = await carModel.find({ authorID: req.user.id}).exec();
  res.render("userlistings", {myAds: myAds.listing});
})

Router.post("/my-ads/delete", urlencoded, async (req, res) => {
  await carModel.deleteOne({ _id: req.body.deleteAd})
  res.redirect("/my-ads")
})

Router.post("/my-ads/update", urlencoded, async (req, res) => {
  await carModel.updateOne({ _id: req.body.adSOLD }, { $set: { adActive: false } }, () => {})
  res.redirect("/my-ads")
})

function Paginator(model) {
  return async (req, res, next) => {
    
    const page = parseInt(req.params.page);
    const filterParam = req.query

    const limit = 15;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) { 
      results.next = {
        page: page + 1,
        limit: limit
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    try {
      results.results = await model
        .find(filterParam)
        .sort({ $natural: -1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.Paginator = results;
      next();
    } catch (err) {
      console.log(err);
    }
  };
}

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = Router;
