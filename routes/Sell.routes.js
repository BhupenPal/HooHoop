const express = require("express");
const router = express.Router();

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../controllers/log/auth");

const existence = require("../controllers/UploadManager/manager");
const uploadFiles = require("../controllers/UploadManager/multer");

const SellController = require("../controllers/Sell.controller");

router.get("/", SellController.getSell);
router.get("/data", ensureAuthenticated, SellController.getSellForm);
router.get("/car-jam", ensureAuthenticated, SellController.getCarJam);
router.post("/submit", ensureAuthenticated, existence, uploadFiles, SellController.postCar);

module.exports = router;
