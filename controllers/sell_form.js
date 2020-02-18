const express = require("express");
const Router = express.Router();
const fs = require("fs");
const multer = require("multer");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({
  extended: !1
});

//MODELS
const carModel = require("../models/carModel");

let photoIndex = 0;

var storeExterior = multer.diskStorage({
  destination: (req, file, cb) => {
    let dirMain = `assets/Uploads/${req.body.vinNum}/`;
    let dirExt = `assets/Uploads/${req.body.vinNum}/exterior`;
    let dirInt = `assets/Uploads/${req.body.vinNum}/interior`;
    if (file.fieldname === "exterior") {
      if (fs.existsSync(dirExt)) {
        cb(null, dirExt);
      } else if (fs.existsSync(dirMain)) {
        fs.mkdir(dirExt, () => {
          cb(null, dirExt);
        });
      } else {
        fs.mkdir(dirMain, () => {
          fs.mkdir(dirExt, () => {
            cb(null, dirExt);
          });
        });
      }
    } else if (file.fieldname === "interiorFront") {
      if (fs.existsSync(dirInt)) {
        cb(null, dirInt);
      } else if (fs.existsSync(dirMain)) {
        fs.mkdir(dirInt, () => {
          cb(null, dirInt);
        });
      } else {
        fs.mkdir(dirMain, () => {
          fs.mkdir(dirInt, () => {
            cb(null, dirInt);
          });
        });
      }
    } else if (file.fieldname === "interiorMiddle") {
      if (fs.existsSync(dirInt)) {
        cb(null, dirInt);
      } else if (fs.existsSync(dirMain)) {
        fs.mkdir(dirInt, () => {
          cb(null, dirInt);
        });
      } else {
        fs.mkdir(dirMain, () => {
          fs.mkdir(dirInt, () => {
            cb(null, dirInt);
          });
        });
      }
    } else if (file.fieldname === "interiorRear") {
      if (fs.existsSync(dirInt)) {
        cb(null, dirInt);
      } else if (fs.existsSync(dirMain)) {
        fs.mkdir(dirInt, () => {
          cb(null, dirInt);
        });
      } else {
        fs.mkdir(dirMain, () => {
          fs.mkdir(dirInt, () => {
            cb(null, dirInt);
          });
        });
      }
    }
  },
  filename: function(req, file, cb) {
    if (file.fieldname === "exterior") {
      let ext = file.originalname.split(".")[1];
      let filename = "Photo-" + photoIndex + "." + ext;
      photoIndex++;
      cb(null, filename);
    } else if (file.fieldname !== "exterior") {
      let ext = file.originalname.split(".")[1];
      let filename = file.fieldname + "." + ext;
      cb(null, filename);
    }
  }
});

var exterior = multer({ storage: storeExterior }).fields([
  { name: "exterior" },
  { name: "interiorFront" },
  { name: "interiorMiddle" },
  { name: "interiorRear" }
]);

Router.post("/car-submit/submit", urlencodedParser, exterior, (req, res) => {
  const newCar = new carModel();
  newCar.Price = req.body.Price;
  newCar.minPrice = req.body.minPrice;
  newCar.Make = req.body.Make;
  newCar.Model = req.body.Model;
  newCar.ModelYear = req.body.ModelYear;
  newCar.BodyType = req.body.BodyType; //TO BE CHANGED
  newCar.DoorNum = req.body.DoorNum;
  newCar.SeatNum = req.body.SeatNum;
  newCar.ModelDetail = req.body.ModelDetail;
  newCar.ImportHistory = req.body.ImportHistory;
  newCar.PreviousOwners = req.body.PreviousOwners;
  newCar.vinNum = req.body.vinNum;
  newCar.kMeters = req.body.kMeters;
  newCar.Colour = req.body.Colour;
  newCar.engineSize = req.body.engineSize;
  newCar.Transmission = req.body.Transmission;
  newCar.fuelType = req.body.fuelType; //TO BE CHANGED
  newCar.cylinderNum = req.body.cylinderNum;
  newCar.WoFexpiry = req.body.WoFexpiry; //TO BE CHANGED
  newCar.regExpiry = req.body.regExpiry; //TO BE CHANGED
  newCar.RoadCost = req.body.RoadCost;
  newCar.Description = req.body.Description;
  newCar.authorID = req.user._id;
  newCar.authorName = `${req.user.firstName} ${req.user.lastName}`;
  newCar.authorMail = req.user.email;
  newCar.authorNumber = `${req.user.phoneNum}`;
  newCar.views = 0;

  photoIndex = 0;

  if (req.body.DriveWheel4 === "on") {
    newCar.DriveWheel4 = 1;
  } else {
    newCar.DriveWheel4 = 0;
  }
  if (req.body.photo360 === "on") {
    newCar.photo360 = 1;
  } else {
    newCar.photo360 = 0;
  }

  if (req.body.authorEmail === "on") {
    newCar.authorEmail = 1;
  } else {
    newCar.authorEmail = 0;
  }

  if (req.body.authorPhone === "on") {
    newCar.authorPhone = 1;
  } else {
    newCar.authorPhone = 0;
  }

  newCar.save();
  res.render("dashboard");
});

module.exports = Router;
