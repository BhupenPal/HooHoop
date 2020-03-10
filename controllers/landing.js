//Express Config
const express = require("express");
const Router = express.Router();
const userPanel = require("./userPanel");
const listCars = require("./listCars");
const carJam = require("./carjam");
const carModel = require('../models/carModel');
const mailer = require('./mail/mailer');

/* HOME ROUTES */
Router.get("/", async (req, res) => {

  const popularCars = await carModel.find().limit(10).sort({views: -1}).exec();
  const hatchCars = await carModel.find({BodyType: "Hatchback"}).limit(10).exec();
  const sedanCars = await carModel.find({BodyType: "Sedan"}).limit(10).exec();
  const PriceFive = await carModel.find({Price: {$lt: 5000}}).limit(10).exec();
  const PriceTen = await carModel.find({Price: {$gt:5000 ,$lt: 10000}}).limit(10).exec();
  const PriceGtTen = await carModel.find({Price: {$gt: 10000}}).limit(10).exec();

  if (req.isAuthenticated()) {
    res.render("index", { user: req.user, popCarData: popularCars, hatchCarData: hatchCars, sedanCarData: sedanCars, PriceFive: PriceFive, PriceTen: PriceTen, PriceGtTen: PriceGtTen });
  } else {
    res.render("index", { user: false, popCarData: popularCars, hatchCarData: hatchCars, sedanCarData: sedanCars, PriceFive: PriceFive, PriceTen: PriceTen, PriceGtTen: PriceGtTen });
  }
});

/* CARJAM API */
Router.use("/", carJam);

/* BUY CAR ROUTES */
Router.use("/", listCars);

/* LOGIN and SIGNUP ROUTE */
Router.use("/", userPanel);

/* NODE MAILER */
Router.use("/", mailer);

Router.get("/about-us", (req, res) => {
  res.render('about_us');
})

Router.get("/faq", (req, res) => {
  res.render('FAQ');
})

Router.get("/privacy-policy", (req, res) => {
  res.render('privacy_policy');
})

Router.get("/terms-of-use", (req, res) => {
  res.render('terms_of_use');
})

Router.get("/cancellation-policy", (req, res) => {
  res.render('cancellation_policy');
})

Router.get("/contact-us", (req, res) => {
  res.render('contact_us');
})

module.exports = Router;