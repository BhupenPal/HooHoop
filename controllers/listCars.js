const express = require("express");
const Router = express.Router();
const carModel = require("../models/carModel");
const userModel = require("../models/userModel");
const fs = require('fs');

const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({ extended: !1 });

const {ensureAuthenticated} = require('./log/auth');

const testDrive = require("../models/testDrive");
const availabilityModel = require("../models/availabilityModel");
const shippingModel = require("../models/shippingModel");

Router.get('/search-car', (req, res) => {
    res.redirect('/search-car/1')
})

Router.get("/search-car/:page", Paginator(carModel), async (req, res) => {
    res.render("buy_car", { record: res.Paginator.results, endPage: res.Paginator.endPage });
});

Router.get('/filter-content/:page', Paginator(carModel), async (req, res) => {

  if(req.xhr){
    res.json({record: res.Paginator.results})
  } else {
    res.send('Link not accessible');
  }

})

Router.get("/buy-car/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let result = await carModel.find({ _id: id }).exec();
    let views = result[0].views + 1;
    carModel.updateOne({ _id: id }, { $set: { views: views } }, () => {});
    let seller = await userModel.find({_id : result[0].authorID})
    fs.readdir(`./assets/Uploads/${result[0].vinNum}/exterior`, (err, files) => {
      res.render("cpage_info", { record: result[0], seller: seller[0], photoArrayLength: files.length });
    });
  } catch (e) {}
});

Router.post("/buy-car/:vID/book-test-drive", urlencoded, async (req, res) => {
  try {

  let vID = req.params.vID;
  const bookTestDrive = new testDrive();
  let result = await carModel.find({ _id: vID }).exec();
  bookTestDrive.firstName = req.body.ft_name;
  bookTestDrive.lastName = req.body.lt_name;
  bookTestDrive.email = req.body.bt_email;
  bookTestDrive.phoneNum = req.body.pt_phone;
  bookTestDrive.carAuthor = result[0].authorID;
  bookTestDrive.status = false;
  bookTestDrive.car = `${result[0].Make} - ${result[0].Model}`;
  if(req.user){
    bookTestDrive.customerID  = req.user._id;
  } else if(!req.user){
    bookTestDrive.customerID  = "Not Logged In";
  }
  bookTestDrive.vehicleID = vID;
  bookTestDrive.save();

    fs.readdir(`./assets/Uploads/${result[0].vinNum}/exterior`, (err, files) => {
      res.render("cpage_info", { record: result[0], photoArrayLength: files.length, success_msg: "Your Test Drive Has Been Booked" });
    });
  } catch (error) {
  }

});

Router.post("/buy-car/:vID/check-availbility", urlencoded, async (req, res) => {

  try {
    let vID = req.params.vID;

    const checkAvailabilityModel = new availabilityModel();
  
    let result = await carModel.find({ _id: vID }).exec();
  
    checkAvailabilityModel.fullName = req.body.ck_name;
    checkAvailabilityModel.email = req.body.ck_email;
    checkAvailabilityModel.phoneNum = req.body.ck_phone;
    checkAvailabilityModel.car = `${result[0].Make} - ${result[0].Model}`;
    checkAvailabilityModel.carAuthor = result[0].authorID;
    checkAvailabilityModel.status = false;
    if(req.user){
      checkAvailabilityModel.customerID  = req.user._id;
    } else if(!req.user){
      checkAvailabilityModel.customerID  = "Not Logged In";
    }
    checkAvailabilityModel.vehicleID = vID;
  
    checkAvailabilityModel.save();
  
    fs.readdir(`./assets/Uploads/${result[0].vinNum}/exterior`, (err, files) => {
      res.render("cpage_info", { record: result[0], photoArrayLength: files.length, success_msg: "Your query has been registered" });
    });
  } catch (error) {
    
  }

});

Router.post("/buy-car/:vID/shipping-quote", urlencoded, async (req, res) => {

  try {

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
    shippingQuote.car = `${result[0].Make} - ${result[0].Model}`
    shippingQuote.carAuthor = result[0].authorID;
    shippingQuote.status = false;
    if(req.user){
      shippingQuote.customerID  = req.user._id;
    } else if(!req.user){
      shippingQuote.customerID  = "Not Logged In";
    }
    shippingQuote.vehicleID = vID;
  
    shippingQuote.save();
  
    fs.readdir(`./assets/Uploads/${result[0].vinNum}/exterior`, (err, files) => {
      res.render(`cpage_info`, { record: result[0], photoArrayLength: files.length, success_msg: "Your query for shipping has been registered" });
    });
    
  } catch (error) {
  }

});

Router.get("/my-ads", ensureAuthenticated, async (req, res) => {
  const myAds = {};
  myAds.listing = await carModel.find({ authorID: req.user.id}).exec();
  res.render("userlistings", {myAds: myAds.listing});
})

Router.post("/my-ads/delete", urlencoded, async (req, res) => {
  let car = await carModel.find({ _id: req.body.deleteAd})
  removeDir(`assets/Uploads/${car[0].vinNum}`);
  await carModel.deleteOne({ _id: req.body.deleteAd})
  res.redirect(req.header('Referer'))
})

Router.post("/my-ads/update", urlencoded, async (req, res) => {
  const car = await carModel.find({_id: req.body.adSOLD});
  if(car[0].adActive == "Active"){
    await carModel.updateOne({ _id: req.body.adSOLD }, { $set: { adActive: "Sold" } }, () => {})
  } else {
    await carModel.updateOne({ _id: req.body.adSOLD }, { $set: { adActive: "Active" } }, () => {})
  }
  res.redirect(req.header('Referer'))
})

function Paginator(model) {
  return async (req, res, next) => {

    if(req.params.page <= 0){
      res.redirect('/search-car/1');
      return
    }

    const page = parseInt(req.params.page);
    let filterParam = req.query;
    filterParam.adActive = "Active";

    if(req.query.car){
      delete filterParam.car

      if(filterParam.Price == ""){
        delete filterParam.Price
      }
      if(filterParam.BodyType == ""){
        delete filterParam.BodyType
      }
      if(filterParam.fuelType == ""){
        delete filterParam.fuelType
      }
    }

    if(req.query.enquiry){
      const regex = new RegExp(escapeRegex(req.query.enquiry), 'gi');
      filterParam = {$or: [ { Make: regex }, { Model: regex }, {vinNum: regex} ] };
    }
    
    if(filterParam.Price){
      if(Array.isArray(filterParam.Price)){
        lower = parseInt(filterParam.Price[0].split('-')[0]);
        upper = parseInt(filterParam.Price[filterParam.Price.length-1].split('-')[1]);
        filterParam.Price = {$gt: lower, $lt: upper}
      } else {
        lower = parseInt(filterParam.Price.split('-')[0]);
        upper = parseInt(filterParam.Price.split('-')[1]);
        filterParam.Price = {$gt: lower, $lt: upper}
      }
    }

    if(filterParam.kMeters){
      if(Array.isArray(filterParam.kMeters)){
        lower = parseInt(filterParam.kMeters[0].split('-')[0]);
        upper = parseInt(filterParam.kMeters[filterParam.kMeters.length-1].split('-')[1]);
        filterParam.kMeters = {$gt: lower, $lt: upper}
      } else {
        lower = parseInt(filterParam.kMeters.split('-')[0]);
        upper = parseInt(filterParam.kMeters.split('-')[1]);
        filterParam.kMeters = {$gt: lower, $lt: upper}
      }
    }

    if(filterParam.Age){
      if(Array.isArray(filterParam.Age)){
        lower = parseInt(filterParam.Age[0].split('-')[0]);
        upper = parseInt(filterParam.Age[filterParam.Age.length-1].split('-')[1]);
        filterParam.Age = {$gt: lower, $lt: upper}
      } else {
        lower = parseInt(filterParam.Age.split('-')[0]);
        upper = parseInt(filterParam.Age.split('-')[1]);
        filterParam.Age = {$gt: lower, $lt: upper}
      }
    }
    const limit = 15;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.endPage = await model.countDocuments(filterParam).exec();

    if (endIndex < results.endPage) { 
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

    results.endPage = Math.ceil(results.endPage / limit);

    if(req.params.page > results.endPage){
      res.redirect(`/search-car/${results.endPage}`);
      return
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

const removeDir = function(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)
 
    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename)
        } else {
          fs.unlinkSync(path + "/" + filename)
        }
      })
      fs.rmdirSync(path)
    } else {
      fs.rmdirSync(path)
    }
  }
}

module.exports = Router;
