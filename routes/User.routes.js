const express = require("express");
const router = express.Router();

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../controllers/log/auth");

const UserController = require("../controllers/User.controller");

router.get("/login", forwardAuthenticated, UserController.getLogin);
router.post("/login", UserController.postLogin);

router.get("/register", UserController.getRegister);
router.post("/register", UserController.postRegister);

router.get("/verify", forwardAuthenticated, UserController.verifyUser);

router.get("/ads", ensureAuthenticated, UserController.userAds);
router.post("/ads/delete", ensureAuthenticated, UserController.deleteUserAd);
router.post("/ads/update", ensureAuthenticated, UserController.updateAd);

router.get("/edit-car/:id", ensureAuthenticated, UserController.getEditCar);
router.post("/edit-car/:id", ensureAuthenticated, UserController.updateEditCar);

router.use("/dashboard", ensureAuthenticated, require("./Dashboard.routes"));

router.get("/reset-password", UserController.getResetPassword);
router.post("/reset-password", UserController.sendPassReset);
router.post("/reset-password/reset", UserController.patchPassword);

router.post("/chatbot/submit", UserController.chatBotHandle);

router.get("/logout", UserController.Logout);

module.exports = router;