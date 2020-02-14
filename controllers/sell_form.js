const express = require("express");
const Router = express.Router();
const fs = require("fs");
const multer = require("multer");

//MODELS
const carModel = require("../models/carModel");
const userModel = require("../models/userModel");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../assets/");
  },
  filename: function(req, file, cb) {
    // should be a very very random string
    let ext = file.originalname.split(".")[1];
    let filename = file.fieldname + "-" + Date.now() + "." + ext;
    cb(null, filename);
  }
});

var multipleupload = multer({ storage: storage }).array("file");

Router.post("/multiple", multipleupload, (req, res) => {
  res.render("index", { fileUploaded: true });
});

Router.post("/submit", urlencodedParser, (req, res) => {
  const newCar = new carModel();
  newCar.Make = req.body.Make;
  newCar.Model = req.body.model;
  newCar.ModelYear = req.body.ModelYear;
  newCar.BodyType = req.body.BodyType;
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
  newCar.fuelType = req.body.fuelType;
  newCar.cylinderNum = req.body.cylinderNum;
  newCar.WoFexpiry = req.body.WoFexpiry;
  newCar.regExpiry = req.body.regExpiry;
  newCar.DriveWheel4 = req.body.DriveWheel4;
  newCar.RoadCost = req.body.RoadCost;
  newCar.Description = req.body.Description;
  newCar.CarFolder = req.body.CarFolder;
});

module.exports = Router;
