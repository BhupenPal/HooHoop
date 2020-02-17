const express = require("express");
const Router = express.Router();
const carModel = require("../models/carModel");

Router.get("/search-car/:page", Paginator(carModel), async (req, res) => {
  res.render("buy_car", { record: res.Paginator.results });
});

Router.get("/buy-car/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let result = await carModel.find({ _id: id }).exec();
    let views = result[0].views + 1;
    carModel.updateOne({ _id: id }, { $set: { views: views } }, () => {});
    res.render("cpage_info", { record: result[0] });
  } catch (e) {}
});

function Paginator(model) {
  return async (req, res, next) => {
    const page = parseInt(req.params.page) || 1;
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
