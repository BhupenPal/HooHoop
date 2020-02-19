const express = require("express");
const Router = express.Router();
const fs = require("fs");
const multer = require("multer");
const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({
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

Router.post("/car-submit/submit", urlencoded, exterior, (req, res) => {
  const newCar = new carModel();
  newCar.Price = req.body.Price;
  newCar.minPrice = req.body.minPrice;
  newCar.Make = req.body.Make;
  newCar.Model = req.body.Model;
  newCar.ModelYear = req.body.ModelYear;
  newCar.DoorNum = req.body.DoorNum;
  newCar.SeatNum = req.body.SeatNum;
  newCar.ModelDetail = req.body.ModelDetail;
  newCar.ImportHistory = req.body.ImportHistory;
  newCar.PreviousOwners = req.body.PreviousOwners;
  newCar.vinNum = req.body.vinNum;
  newCar.kMeters = req.body.kMeters;
  newCar.Colour = req.body.Colour;
  newCar.engineSize = req.body.engineSize;
  newCar.cylinderNum = req.body.cylinderNum;
  newCar.RoadCost = req.body.RoadCost;
  newCar.Description = req.body.Description;
  newCar.authorID = req.user._id;
  newCar.authorName = `${req.user.firstName} ${req.user.lastName}`;
  newCar.authorMail = req.user.email;
  newCar.authorNumber = `${req.user.phoneNum}`;
  newCar.views = 0;

  photoIndex = 0;

  if(req.body.BodyType === "CV"){
    newCar.BodyType = "Convertible"
  }else if(req.body.BodyType === "HA"){
    newCar.BodyType = "Hatchback"
  }else if(req.body.BodyType === "HV"){
    newCar.BodyType = "Heavy Van"
  }else if(req.body.BodyType === "LV"){
    newCar.BodyType = "Light Van"
  }else if(req.body.BodyType === "SW"){
    newCar.BodyType = "Station Wagon"
  }else if(req.body.BodyType === "UT"){
    newCar.BodyType = "Utility"
  }else {
    newCar.BodyType = "Other"
  }

  if(req.body.fuelType === 01){
    newCar.fuelType = "Petrol"
  }else if(req.body.fuelType === 02){
    newCar.fuelType = "Diesel"
  }else if(req.body.fuelType === 05){
    newCar.fuelType = "Electric"
  }else if(req.body.fuelType === 93){
    newCar.fuelType = "Hybrid"
  }else{
    newCar.fuelType = "Other"
  }

  if(req.body.Transmission.includes("automatic")){
    newCar.Transmission = "Automatic"
  } else if(req.body.Transmission.includes("manual")){
    newCar.Transmission = "Manual"
  } else if(req.body.Transmission.includes("triptonic")){
    newCar.Transmission = "Triptonic";
  }

  newCar.WoFexpiry = theDate(req.body.WoFexpiry);
  newCar.regExpiry = theDate(req.body.regExpiry);

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

const theDate = (timeStamp) => {
  const dateString = new Date(timeStamp * 1000);
  return dateString.toGMTString();
}

module.exports = Router;
