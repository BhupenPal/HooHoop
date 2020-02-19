//Express Config
const express = require("express");
const Router = express.Router();
const userPanel = require("./userPanel");
const listCars = require("./listCars");
const carJam = require("./carjam");
const mailer = require("./mail/mailer");

/* HOME ROUTES */
Router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index", { user: req.user });
  } else {
    res.render("index", { user: false });
  }
});

/* CARJAM API */
Router.use("/", carJam);

/* BUY CAR ROUTES */
Router.use("/", listCars);

/* LOGIN and SIGNUP ROUTE */
Router.use("/", userPanel);

Router.use("/", mailer);

module.exports = Router;
