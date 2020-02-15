//Express Config
const express = require("express");
const Router = express.Router();
const userPanel = require("./userPanel");
const carJam = require("./carjam");

/* HOME ROUTES */
Router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index", { user: req.user });
  } else {
    res.render("index", { user: false });
  }
});

/* SELL YOUR CAR ROUTES*/
Router.get("/sell-car", (req, res) => {
  res.render("sell_car");
});

Router.use("/", carJam);

/* BUY CAR ROUTES */
Router.get("/buy-car", (req, res) => {
  res.render("buy_car");
});

/* LOGIN and SIGNUP ROUTE */

Router.use("/", userPanel);

/* CAR360 ROUTE */ 
Router.get("/Listing", (req, res) => {
  res.render("cpage_info")
})

module.exports = Router;
