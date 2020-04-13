const carModel = require("../models/carModel");
const testDrive = require("../models/testDrive");
const availabilityModel = require("../models/availabilityModel");
const shippingModel = require('../models/shippingModel');
const transporter = require("../controllers/mail/config/trasnport");
const fs = require('fs');

const { contactMail } = require("./mail/allMail");

/* Home Routes */
module.exports = {
  getIndex: async (req, res, next) => {
    const popularCars = await carModel
      .find({ adActive: "Active" })
      .limit(10)
      .sort({ views: -1 });
    const hatchCars = await carModel
      .find({ BodyType: "Hatchback", adActive: "Active" })
      .limit(10)
      .sort({$natural: -1});
    const sedanCars = await carModel
      .find({ BodyType: "Sedan", adActive: "Active" })
      .limit(10)
      .sort({$natural: -1});
    const PriceFive = await carModel
      .find({ Price: { $lt: 5000 }, adActive: "Active" })
      .limit(10)
      .sort({$natural: -1});
    const PriceTen = await carModel
      .find({ Price: { $gt: 5000, $lt: 10000 }, adActive: "Active" })
      .limit(10)
      .sort({$natural: -1});
    const PriceGtTen = await carModel
      .find({ Price: { $gt: 10000 }, adActive: "Active" })
      .limit(10)
      .sort({$natural: -1});

    res.render("index", {
      popCarData: popularCars,
      hatchCarData: hatchCars,
      sedanCarData: sedanCars,
      PriceFive: PriceFive,
      PriceTen: PriceTen,
      PriceGtTen: PriceGtTen,
    });
  },

  getAbout: (req, res, next) => {
    res.render("about_us");
  },

  getFaq: (req, res, next) => {
    res.render("FAQ");
  },

  getPrivacy: (req, res, next) => {
    res.render("privacy_policy");
  },

  getTerms: (req, res, next) => {
    res.render("terms_of_use");
  },

  getCancellation: (req, res, next) => {
    res.render("cancellation_policy");
  },

  getContact: (req, res, next) => {
    res.render("contact_us");
  },

  postContact: (req, res, next) => {
    const { name, email, subject, message } = req.body;

    let mailOptions = {
      from: '"ALBOT" <contact@hoohoop.co.nz>', // sender address
      to: 'contact@hoohoop.co.nz', // list of receivers
      subject: "HooHoop Query", // Subject line
      html: contactMail(name, email, subject, message),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });

    res.render("contact_us", {
      success_msg: "The contact form has been submitted",
    });
  },

  getCar: async (req, res, next) => {
    let FrontCheck, RearCheck;
    await carModel.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: {views: 1} },
      async (err, doc) => {
        const popularCars = await carModel
        .find({ adActive: "Active" })
        .limit(10)
        .sort({ views: -1 });
        if(fs.existsSync(`./assets/Uploads/${doc.vinNum}/interior/INTERIORFRONT.JPG`)){
          FrontCheck = true
        }
        if(fs.existsSync(`./assets/Uploads/${doc.vinNum}/interior/INTERIORREAR.JPG`)){
          RearCheck = true
        }
        res.render("cpage_info", {
          record: doc, recommended: popularCars, FrontCheck, RearCheck
        });
      }
    );
  },

  bookDrive: async (req, res, next) => {
    let { ft_name, lt_name, bt_email, pt_phone } = req.body;
    let result = await carModel.findOne({ _id: req.params.id });
    let bookTestDrive = new testDrive({
      firstName: ft_name,
      lastName: lt_name,
      email: bt_email,
      phoneNum: pt_phone,
      carAuthor: result.authorEmail,
      car: `${result.Make} - ${result.Model}`,
      vehicleID: req.params.id,
      vinNum: result.vinNum
    });
    bookTestDrive.date = getTodayDate();
    bookTestDrive.save();
    res.render("cpage_info", {
      record: result,
      success_msg: "Your Test Drive Has Been Booked",
    });
  },

  checkAvail: async (req, res, next) => {
    let result = await carModel.findOne({ _id: req.params.id });
    const checkAvailabilityModel = new availabilityModel({
      fullName: req.body.ck_name,
      email: req.body.ck_email,
      phoneNum: req.body.ck_phone,
      car: `${result.Make} - ${result.Model}`,
      carAuthor: result.authorEmail,
      vehicleID: req.params.id,
      vinNum: result.vinNum
    });
    checkAvailabilityModel.date = getTodayDate();
    checkAvailabilityModel.save();
    res.render("cpage_info", {
      record: result,
      success_msg: "Your query has been registered",
    });
  },

  shipQuote: async (req, res, next) => {
    let result = await carModel.findOne({ _id: req.params.id });
    const shippingQuote = new shippingModel({
      fullName: req.body.sq_name,
      email: req.body.sq_email,
      phoneNum: req.body.sq_phone,
      fromLocation: req.body.wh_move_from,
      toLocation: req.body.wh_move_to,
      transportDate: req.body.wh_date,
      note: req.body.wh_question,
      car: `${result.Make} - ${result.Model}`,
      carAuthor: result.authorEmail,
      vehicleID: req.params.id,
      vinNum: result.vinNum
    });
    shippingQuote.date = getTodayDate();
    shippingQuote.save();
    res.render(`cpage_info`, {
      record: result,
      success_msg: "Your query for shipping has been registered",
    });
  }
};

function getTodayDate(){
  let date = new Date();
  date = date.toDateString();
  date = date.substring(4);
  date = date.split(' ').join('-');
  return date;
}