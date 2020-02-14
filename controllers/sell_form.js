var express = require("express");
var Router = express.Router();

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    // should be a very very random string
    let ext = file.originalname.split(".")[1];
    let filename = file.fieldname + "-" + Date.now() + "." + ext;
    cb(null, filename);
  }
});

var singleupload = multer({ storage: storage }).single("file");
var multipleupload = multer({ storage: storage }).array("file");

Router.get("/", (req, res) => {
  res.render("index", { fileUploaded: false });
});

Router.post("/", singleupload, (req, res) => {
  res.render("index", { fileUploaded: true });
});

Router.post("/multiple", multipleupload, (req, res) => {
  res.render("index", { fileUploaded: true });
});

module.exports = Router;
