const multer = require("multer");
const fs = require("fs");

const storageManager = multer.diskStorage({
  destination: (req, file, cb) => {
    let vinNum = req.body.vinNum.toUpperCase();
    let dirMain = `assets/Uploads/${vinNum}/`;
    let dirExt = `assets/Uploads/${vinNum}/exterior`;
    let dirInt = `assets/Uploads/${vinNum}/interior`;
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
  filename: function (req, file, cb) {
    let dirInt = `assets/Uploads/${req.body.vinNum}/interior`;
    if (file.fieldname === "exterior") {
      let ext = file.originalname.split(".")[1];
      let filename = "video." + ext;
      cb(null, filename);
    } else if (file.fieldname !== "exterior") {
      let ext = file.originalname.split(".")[1];
      let filename = file.fieldname + "." + ext;
      cb(null, filename.toLowerCase());
    }
  },
});

module.exports = multer({ storage: storageManager }).fields([
  { name: "exterior", maxCount: 1 },
  { name: "interiorFront", maxCount: 1 },
  { name: "interiorMiddle", maxCount: 1 },
  { name: "interiorRear", maxCount: 1 },
]);
