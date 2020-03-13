const express = require("express");
const Router = express.Router();
const fs = require("fs");
const multer = require("multer");
var ffmpeg = require('ffmpeg');
const carModel = require("../models/carModel");
const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({
  extended: !1
});

let thumbnail = null;

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
        let filename = "video." + ext;
        thumbnail = filename;
        cb(null, filename);
    } else if (file.fieldname !== "exterior") {
      let ext = file.originalname.split(".")[1];
      ext = ext.toUpperCase();
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
  newCar.Make = req.body.Make.toUpperCase();
  newCar.Model = req.body.Model.toUpperCase();
  newCar.mYear = req.body.ModelYear;
  newCar.Age = (new Date().getFullYear() - req.body.ModelYear);
  newCar.Transmission = req.body.Transmission;
  newCar.DoorNum = req.body.DoorNum;
  newCar.SeatNum = req.body.SeatNum;
  newCar.ModelDetail = req.body.ModelDetail;
  newCar.ImportHistory = req.body.ImportHistory;
  newCar.PreviousOwners = req.body.PreviousOwners;
  newCar.vinNum = req.body.vinNum.toUpperCase();
  newCar.kMeters = req.body.kMeters;
  newCar.Colour = req.body.Colour;
  newCar.engineSize = req.body.engineSize;
  newCar.cylinderNum = req.body.cylinderNum;
  newCar.RoadCost = req.body.RoadCost;
  newCar.Description = req.body.Description;
  newCar.authorID = req.user._id;
  newCar.adActive = "Active";
  newCar.views = 0;

  newCar.DealerName = req.body.DealerName;
  if(!req.body.DealerName){
    newCar.DealerName = `${req.user.firstName} ${req.user.lastName}`
  }
  newCar.DealerNum = req.body.DealerNum;
  if(!req.body.DealerNum){
    newCar.DealerNum = req.user.phoneNum;
  }
  newCar.DealerEmail = req.body.DealerEmail;
  if(!req.body.DealerEmail){
    newCar.DealerEmail = req.user.email;
  }

  newCar.WoFexpiry = req.body.WoFexpiry;
  newCar.regExpiry = req.body.regExpiry;

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

  try {
    var process = new ffmpeg(`assets/Uploads/${req.body.vinNum}/exterior/${thumbnail}`);
    process.then(function (video) {
      video.fnExtractFrameToJPG(`assets/Uploads/${req.body.vinNum}/exterior`, {
        frame_rate: 2,
        file_name : 'Photo%i',
        keep_pixel_aspect_ratio: true,
        keep_aspect_ratio: false,
        size: '1920x1080'
      }, function (error) {
        if (!error)
          console.log("Frame Break Done");
      });
    }, function (err) {
      console.log('Error: ' + err);
    });
  } catch (e) {
    console.log(e.code);
    console.log(e.msg);
  }

  setTimeout(()=>{
    fs.unlinkSync(`assets/Uploads/${req.body.vinNum}/exterior/${thumbnail}`)
  }, 10000)

  newCar.save();
  res.send("Done")
});


module.exports = Router;
