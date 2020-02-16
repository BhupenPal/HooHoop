const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const carModel = require("../models/carModel");

Router.get("/buy-car", Paginator(carModel), (req, res) => {
  res.render("buy_car", { record: res.Paginator });
});

function Paginator(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = 10;

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
        .find()
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.Paginator = results;
      next();
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = Router;
