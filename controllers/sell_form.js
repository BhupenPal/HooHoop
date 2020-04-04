const express = require("express");
const Router = express.Router();
const fs = require("fs");
const multer = require("multer");
var ffmpeg = require("ffmpeg");
const carModel = require("../models/carModel");
const sharp = require("sharp");
sharp.cache(false);
const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({
  extended: !1
});

const { ensureAuthenticated } = require("./log/auth");
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
    let dirInt = `assets/Uploads/${req.body.vinNum}/interior`;
    if (file.fieldname === "exterior") {
      let ext = file.originalname.split(".")[1];
      let filename = "video." + ext;
      thumbnail = filename;
      cb(null, filename);
    } else if (file.fieldname !== "exterior") {
      let ext = file.originalname.split(".")[1];
      let filename = file.fieldname + "." + ext;
      cb(null, filename.toLowerCase());
    }
  }
});

var exterior = multer({ storage: storeExterior }).fields([
  { name: "exterior" },
  { name: "interiorFront" },
  { name: "interiorMiddle" },
  { name: "interiorRear" }
]);

Router.post(
  "/car-submit/submit",
  ensureAuthenticated,
  urlencoded,
  existence,
  exterior,
  async (req, res) => {
    const newCar = new carModel();
    newCar.Price = req.body.Price;
    newCar.minPrice = req.body.minPrice;
    newCar.Make = req.body.Make.toUpperCase();
    newCar.Model = req.body.Model.toUpperCase();
    newCar.fuelType = req.body.FuelType;
    newCar.BodyType = req.body.BodyType;
    newCar.mYear = req.body.ModelYear;
    newCar.Age = new Date().getFullYear() - req.body.ModelYear;
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
    newCar.Description = req.body.Description;
    newCar.authorID = req.user._id;
    newCar.adActive = "Active";
    newCar.views = 0;

    newCar.DealerName = req.body.DealerName;
    if (!req.body.DealerName) {
      newCar.DealerName = `${req.user.firstName} ${req.user.lastName}`;
    }
    newCar.DealerNum = req.body.DealerNum;
    if (!req.body.DealerNum) {
      newCar.DealerNum = req.user.phoneNum;
    }
    newCar.DealerEmail = req.body.DealerEmail;
    if (!req.body.DealerEmail) {
      newCar.DealerEmail = req.user.email;
    }

    newCar.WoFexpiry = req.body.WoFexpiry;
    newCar.regExpiry = req.body.regExpiry;

    if (req.body.DriveWheel4 == "on") {
      newCar.DriveWheel4 = 4;
    } else {
      newCar.DriveWheel4 = 2;
    }

    if (req.body.RoadCost == true) {
      newCar.RoadCost = "";
    } else {
      newCar.RoadCost = "Not";
    }

    try {
      var process = new ffmpeg(
        `assets/Uploads/${req.body.vinNum}/exterior/${thumbnail}`
      );
      process.then(
        function(video) {
          video.fnExtractFrameToJPG(
            `assets/Uploads/${req.body.vinNum}/exterior`,
            {
              frame_rate: 2,
              file_name: "Photo%i",
              keep_pixel_aspect_ratio: true,
              keep_aspect_ratio: false,
              size: "1920x1080"
            },
            function(error) {
              if (!error) console.log("Frame Break Done");
            }
          );
        },
        function(err) {
          console.log("Error: " + err);
        }
      );
      setTimeout(() => {
        fs.unlinkSync(
          `assets/Uploads/${req.body.vinNum}/exterior/${thumbnail}`
        );
      }, 90000);
    } catch (e) {
      console.log(e.code);
      console.log(e.msg);
    }

    fs.readdir(`./assets/Uploads/${req.body.vinNum}/interior`, (err, files) => {
      files.forEach(async currFile => {
        await sharp(`assets/Uploads/${req.body.vinNum}/interior/${currFile}`)
          .resize(3200, 1600)
          .jpeg({ quality: 100 })
          .toFile(
            `assets/Uploads/${
              req.body.vinNum
            }/interior/${currFile.toUpperCase()}`
          );
        setTimeout(() => {
          fs.unlinkSync(
            `assets/Uploads/${req.body.vinNum}/interior/${currFile}`
          );
        }, 90000);
      });
    });

    newCar.save();
    res.send("Done");
  }
);

async function existence(req, res, next) {
  const exist = await carModel.find({
    vinNum: req.headers.platecheck.toUpperCase()
  });
  if (exist[0]) {
    res.send("EXISTS");
    res.end();
  } else {
    next();
  }
}

module.exports = Router;
