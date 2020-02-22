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

  if (req.isAuthenticated()) {
    res.render("index", { user: req.user, popCarData: popularCars, hatchCarData: hatchCars, sedanCarData: sedanCars });
  } else {
    res.render("index", { user: false, popCarData: popularCars, hatchCarData: hatchCars, sedanCarData: sedanCars });
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

module.exports = Router;