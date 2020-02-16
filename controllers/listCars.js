const express = require("express");
const Router = express.Router();
const carModel = require("../models/carModel");

// Router.get("/buy-car", (req, res) => {
//     res.render("buy_car");
//   });

Router.get("/buy-car", (req, res) => {
  var PageNo = parseInt(req.query.PageNo);
  var size = parseInt(req.query.size);

  var query = {};

  if (PageNo < 0 || PageNo === 0) {
    Response = { error: true, message: "invalid page number" };
    return res.json(Response);
  }

  query.skip = size * (PageNo - 1);
  query.limit = size;

  carModel.find({}, {}, query, function(err, data) {
    if (err) {
      response = { error: true, message: "Error fetching data" };
    } else {
      response = { error: false, message: data };
    }
    console.log(response + "___________________");
    console.log(data);
    res.render("buy_car", { record: data });
  });
});

module.exports = Router;
