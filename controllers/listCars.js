const express = require("express");
const Router = express.Router();
const carModel = require("../models/carModel");

const {ensureAuthenticated} = require('./log/auth');

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
             noMatch = "No campgrounds match that query, please try again.";
         }
         res.render("buy_car",{record: allCars});
      }
   });
  }

})

Router.get("/search-car/:page", Paginator(carModel), async (req, res) => {
  
  // Content Type JSON return res.json(res.Paginator.results)
  if(isEmpty(req.query)){
    res.render("buy_car", { record: res.Paginator.results });
  } else {
    console.log(req.query)
    res.json( {record: res.Paginator.results})
  }
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

Router.get("/my-listings", ensureAuthenticated, async (req, res) => {
  const myAds = {};
  myAds.listing = await carModel.find({ authorID: req.user.id}).exec();
  res.render("userlistings", {myAds: myAds.listing});
})

function Paginator(model) {
  return async (req, res, next) => {

    const page = parseInt(req.params.page);
    const limit = 9;

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

const isEmpty = inputObject => {
  return Object.keys(inputObject).length === 0;
};

module.exports = Router;
