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
const userModel = require("../models/userModel");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    fs.mkdir("assets/Uploads/" + req.body.vinNum, () => {
      cb(null, `assets/Uploads/${req.body.vinNum}`);
    });
  },
  filename: function(req, file, cb) {
    let ext = file.originalname.split(".")[1];
    let filename = "Photo-" + Date.now() + "." + ext;
    cb(null, filename);
  }
});

var multipleupload = multer({ storage: storage }).array("file");

Router.post(
  "/car-submit/submit",
  urlencodedParser,
  multipleupload,
  async (req, res) => {
    console.log(req.body);
    const newCar = new carModel();
    newCar.Price = req.body.Price;
    newCar.Make = req.body.Make;
    newCar.Model = req.body.model;
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
    newCar.Approved = false;

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
    res.send("HELLO");
  }
);

module.exports = Router;
