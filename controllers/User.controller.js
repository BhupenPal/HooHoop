const userModel = require("../models/userModel");
const carModel = require("../models/carModel");
const couponModel = require("../models/couponModel");
const transporter = require("../controllers/mail/config/trasnport");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const fs = require("fs");
let errors = [];

const { GenerateRandom, PassCheck } = require("./log/passCheck");
const { verificationMail, resetMail, discountMail } = require("./mail/allMail");

module.exports = {
  getLogin: (req, res, next) => {
    res.render("login");
  },

  postLogin: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: req.session.redirectTo || "/",
      failureRedirect: "/user/login",
      failureFlash: true,
    })(req, res, next);
  },

  getRegister: (req, res, next) => {
    res.render("register");
  },

  postRegister: (req, res, next) => {
    errors = [];

    const {
      firstName,
      lastName,
      email,
      phoneNum,
      password,
      password2,
      address,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !password2) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (errors.length == 0) {
      PassCheck(password, password2, errors);
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        firstName,
        lastName,
        email,
        phoneNum,
        password,
        password2,
      });
    } else {
      userModel.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: "Email already exists" });
          res.render("register", {
            errors,
            firstName,
            lastName,
            email,
            phoneNum,
            password,
            password2,
            address,
          });
        } else {
          userModel.findOne({ phoneNum: phoneNum }).then((user) => {
            if (user) {
              errors.push({ msg: "Phone number already exists" });
              res.render("register", {
                errors,
                firstName,
                lastName,
                email,
                phoneNum,
                password,
                password2,
                address,
              });
            } else {
              const secretToken = GenerateRandom();
              const newUser = new userModel({
                firstName,
                lastName,
                phoneNum,
                email,
                password,
                address,
                secretToken,
              });

              //Hash Password
              bcrypt.genSalt(12, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  //Set password to hashed
                  newUser.password = hash;
                  //Save User
                  newUser.save();
                })
              );

              let mailOptions = {
                from: '"HooHoop" <contact@hoohoop.co.nz>', // sender address
                to: email, // list of receivers
                subject: "HooHoop Account Verification Email", // Subject line
                html: verificationMail(firstName, secretToken), // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                success_msg = "Email has been sent";
                res.render("login", { success_msg });
              });
            }
          });
        }
      });
    }
  },

  verifyUser: async (req, res, next) => {
    const secretToken = req.query.token;
    let errors = [];

    const user = await userModel.findOne({ secretToken: secretToken });
    if (!user) {
      errors.push({ msg: "No user found" });
      return res.redirect("/sign-up");
    }

    user.secretToken = null;
    user.active = true;
    user.save();

    res.render("emailVer", { userVerified: true });
  },

  userAds: async (req, res, next) => {
    const UploadedAds = await carModel
      .find({ authorID: req.user.id })
      .sort({ $natural: -1 });
    res.render("userlistings", { myAds: UploadedAds });
  },

  deleteUserAd: async (req, res, next) => {
    await carModel.findByIdAndDelete({ _id: req.body.deleteAd }, (err, doc) => {
      removeDir(`assets/Uploads/${doc.vinNum}`);
      res.redirect(req.header("Referer"));
    });
  },

  updateAd: async (req, res) => {
    const car = await carModel.findOne({ _id: req.body.adSOLD });
    if (car.adActive == "Active") {
      await carModel.updateOne(
        { _id: req.body.adSOLD },
        { $set: { adActive: "Sold" } },
        res.redirect(req.header("Referer"))
      );
    } else {
      await carModel.updateOne(
        { _id: req.body.adSOLD },
        { $set: { adActive: "Active" } },
        res.redirect(req.header("Referer"))
      );
    }
  },

  getEditCar: async (req, res, next) => {
    const EditCar = await carModel.findOne({ _id: req.params.id });
    if (EditCar.authorID == req.user._id || req.user.isAdmin) {
      res.render("edit_cpage", { car: EditCar });
    } else {
      next(new Error("Unauthorised Access"));
    }
  },

  updateEditCar: async (req, res, next) => {
    const changes = req.body;
    carModel.updateOne(
      { _id: req.params.id },
      { $set: changes },
      res.redirect(`/user/edit-car/${req.params.id}`)
    );
  },

  getResetPassword: async (req, res) => {
    if (req.query.token === undefined) {
      return res.render("forgotPass", {
        mailSent: false,
        tokenReceived: false,
      });
    } else {
      const user = await userModel.findOne({ resetToken: req.query.token });
      if (!user) {
        errors.push({ msg: "Invalid reset code" });
        res.render("forgotPass", {
          errors,
          mailSent: false,
          tokenReceived: false,
        });
      } else {
        res.render("forgotPass", {
          mailSent: false,
          tokenReceived: req.query.token,
        });
      }
    }
  },

  sendPassReset: async (req, res) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email: email });

    let KeyToken = GenerateRandom();

    if (!user) {
      errors.push({ msg: "The email is not registered" });
      return res.render("forgotPass", {
        errors,
        mailSent: false,
        tokenReceived: false,
      });
    }

    let mailOptions = {
      from: '"HooHoop" <contact@hoohoop.co.nz>', // sender address
      to: email, // list of receivers
      subject: "HooHoop Account Password Reset", // Subject line
      html: resetMail(user.firstName, KeyToken), // html body
    };

    user.updateOne(
      { email: email },
      { $set: { resetToken: KeyToken } },
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        errors.push({ msg: "Password reset link has been sent to your mail" });
        res.render("forgotPass", {
          errors,
          mailSent: true,
          tokenReceived: false,
        });
      })
    );
  },

  patchPassword: async (req, res) => {
    let { password, password2, tokenReceived } = req.body;
    const user = await userModel.findOne({ resetToken: tokenReceived });

    PassCheck(password, password2, errors);

    if (errors.length > 0) {
      res.render("forgotPass", {
        errors,
        password,
        password2,
      });
    } else {
      //Hash Password
      bcrypt.genSalt(12, (err, salt) =>
        bcrypt.hash(password, salt, (err, hash) => {
          //Set password to hashed
          user.password = hash;
          //Save User
          user.updateOne(
            { resetToken: tokenReceived },
            { $set: { password: hash, resetToken: null } },
            res.render("login", { success_msg: "Password reset succesfull" })
          );
        })
      );
    }
  },

  chatBotHandle: async (req, res) => {
    const {
      email,
      phoneNo,
      discount,
      CouponCode,
      carID,
      tod,
      tom,
      carPrice,
      discountFor,
    } = req.body;

    let result = await carModel.findOne({ _id: discountFor });

    if (CouponCode == "null") {
      let NoDeal = new NoDealModel({
        email,
        phoneNo,
      });
      NoDeal.uLastOffer = discount;
      NoDeal.car = `${result.Make} - ${result.Model}`;
      NoDeal.carAuthor = result.authorID;
      NoDeal.vinNum = result.vinNum;
      let offerDate = new Date();
      offerDate = offerDate.toUTCString();
      offerDate = offerDate.split(" ").slice(0, 4).join(" ");
      NoDeal.date = offerDate;
      NoDeal.save();
    } else {
      let NewCoupon = new couponModel({
        custEmail: email,
        custPhone: phoneNo,
        discount,
        CouponCode,
        discount,
        tod,
        tom,
        carPrice,
      });

      if (carID) {
        NewCoupon.trade = "Yes";
        NewCoupon.tradeVehicle = carID;
      } else {
        NewCoupon.trade = "No";
        NewCoupon.tradeVehicle = "-";
      }
      NewCoupon.vehicleObjId = result._id;
      NewCoupon.CouponCode = CouponCode;
      NewCoupon.authorID = result.authorID;
      NewCoupon.vehicleID = result.vinNum;
      NewCoupon.vehicleName = `${result.Make} - ${result.Model}`;
      NewCoupon.save()
        .then((doc) => {})
        .catch((err) => console.log(err));

      let mailOptions = {
        from: '"HooHoop" <contact@hoohoop.co.nz>', // sender address
        to: email, // list of receivers
        subject: "HooHoop Discount Coupon Code", // Subject line
        html: discountMail(
          `${result.Make} - ${result.Model}`,
          discount,
          result.DealerName,
          result.DealerEmail,
          result.DealerNum,
          CouponCode
        ),
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
      });
    }

    res.send("Done");
  },

  Logout: (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
  },
};

const removeDir = function (path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename);
        } else {
          fs.unlinkSync(path + "/" + filename);
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.rmdirSync(path);
    }
  }
};
