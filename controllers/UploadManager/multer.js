const multer = require("multer");
const fs = require("fs");

const storageManager = multer.diskStorage({
  destination: (req, file, cb) => {
    let vinNum = req.body.vinNum.toUpperCase();

    if (!fs.existsSync(`assets/Uploads/${vinNum}/`)) {
      fs.mkdirSync(`assets/Uploads/${vinNum}/`);
      fs.mkdirSync(`assets/Uploads/${vinNum}/exterior`);
    }

    if (file.fieldname === "exterior") {
      cb(null, `assets/Uploads/${vinNum}/exterior`);
    } else {
      if (!fs.existsSync(`assets/Uploads/${vinNum}/interior`)) {
        fs.mkdirSync(`assets/Uploads/${vinNum}/interior`);
      }
      cb(null, `assets/Uploads/${vinNum}/interior`);
    }
  },
  filename: function (req, file, cb) {
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

module.exports = multer({
  fileFilter: (req, file, cb) => {
    if (req.existence) {
      req.stop = true;
      return cb(null, false);
    } else {
      req.stop = false;
      return cb(null, true)
    }
  },
  storage: storageManager,
}).fields([
  { name: "exterior", maxCount: 1 },
  { name: "interiorFront", maxCount: 1 },
  { name: "interiorMiddle", maxCount: 1 },
  { name: "interiorRear", maxCount: 1 },
]);
