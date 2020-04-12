const carModel = require("../models/carModel");
const userModel = require("../models/userModel");
const shipModel = require("../models/shippingModel");
const testDrive = require("../models/testDrive");
const checkAvail = require("../models/availabilityModel");
const couponModel = require("../models/couponModel");
const noDealModel = require("../models/nodealModel");
const bcrypt = require("bcryptjs");
let errors = [];

const { GenerateRandom, PassCheck } = require("./log/passCheck");

module.exports = {
  getDashboard: (req, res, next) => {
    res.redirect("/user/dashboard/profile");
  },

  postProfile: async (req, res, next) => {
    errors = [];
    let { firstName, lastName, phoneNum, address } = req.body;

    let currentUser = await userModel.findOne({ _id: req.user._id });

    if (!firstName) {
      firstName = currentUser.firstName;
    }

    if (!lastName) {
      lastName = currentUser.lastName;
    }

    if (!phoneNum) {
      phoneNum = currentUser.phoneNum;
    }

    userModel.updateOne(
      { _id: req.user._id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          phoneNum: phoneNum,
          address: address,
        },
      },
      (err, doc) => {
        res.redirect("/user/dashboard/profile");
      }
    );
  },

  patchPassword: async (req, res, next) => {
    errors = [];
    const { originalPass, password, password2 } = req.body;

    let currentUser = await userModel.findOne({ _id: req.user.id });

    if (!originalPass || !password || !password2) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (errors.length == 0) {
      PassCheck(password, password2, errors);
    }

    if (errors.length > 0) {
      res.render("d_account", { errors });
    } else {
      bcrypt.compare(originalPass, currentUser.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          bcrypt.genSalt(12, (err, salt) =>
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              userModel.updateOne(
                { email: currentUser.email },
                {
                  $set: {
                    password: hash,
                  },
                },
                res.render("d_account", {
                  success_msg: "Password Updated Successfully",
                })
              );
            })
          );
        } else {
          errors.push({
            msg:
              "The password you entered does not match your current password",
          });
          res.render("d_account", { errors });
        }
      });
    }
  },

  getAllDashboard: (req, res, next) => {
    if (req.params.sec == "account") res.render("d_account");
    else if (req.params.sec == "listings") res.render("d_u_listing");
    else if (req.params.sec == "all-listings") res.render("d_all_listing");
    else if (req.params.sec == "client-management") res.render("d_reqpanel");
    else if (req.params.sec == "all-client-management") res.render("d_allreq");
    else if (req.params.sec == "user-management") res.render("d_user_man");
    else if (req.params.sec == "offers") res.render("d_user_off");
    else if (req.params.sec == "No-deal-requests") res.render("d_nodeal");
    else if (req.params.sec == "profile") res.render("d_profile");
    else
      next(new Error("Oops! The page you are trying to access does not exist"));
  },

  getMyAds: async (req, res, next) => {
    if (req.xhr) {
      let myList = await carModel
        .find({ authorID: req.user.id })
        .sort({ $natural: -1 });
      res.json({ list: myList });
      res.end();
    } else {
      next(new Error("Unauthorised Access"));
      res.end();
    }
  },

  getAllAds: async (req, res, next) => {
    if (req.xhr) {
      if (req.user.isAdmin) {
        if (req.query.filter) {
        }
        let myList = await carModel.find().sort({ $natural: -1 });
        res.json({ list: myList });
        res.end();
      } else {
        next(new Error("Unauthorised Access"));
      }
    } else {
      next(new Error("Unauthorised Access"));
    }
  },

  getUserList: async (req, res, next) => {
    if (req.xhr) {
      if (req.user.isAdmin) {
        let allUsers = await userModel
          .find({ isAdmin: { $ne: true } })
          .sort({ $natural: -1 });
        res.json({ list: allUsers });
      } else {
        next(new Error("Unauthorised Access"));
      }
    } else {
      next(new Error("Unauthorised Access"));
    }
  },

  deleteUser: async (req, res, next) => {
    if (req.user.isAdmin) {
      await userModel.deleteOne({ _id: req.body.deleteAd });
      res.redirect(req.header("Referer"));
    } else {
      next(new Error("Unauthorised Access"));
      res.end();
    }
  },

  getTestDrive: async (req, res, next) => {
    let TestDrive = await testDrive
      .find({ carAuthor: req.user._id })
      .sort({ $natural: -1 });
    if (req.xhr) {
      res.json({ list: TestDrive });
      res.end();
    } else {
      next(new Error("Unauthorised Access"));
      res.end();
    }
  },

  getAvailability: async (req, res, next) => {
    let CheckAvail = await checkAvail
      .find({ carAuthor: req.user._id })
      .sort({ $natural: -1 });
    if (req.xhr) {
      res.json({ list: CheckAvail });
    } else {
      next(new Error("Unauthorised Access"));
    }
  },

  getShipEnq: async (req, res, next) => {
    if (req.xhr) {
      let ShipList = await shipModel
        .find({ carAuthor: req.user._id })
        .sort({ $natural: -1 });
      res.json({ list: ShipList });
    } else {
      next(new Error("Unauthorised Access"));
    }
  },

  getAllTestDrive: async (req, res, next) => {
    let TestDrive = await testDrive.find({}).sort({ $natural: -1 });

    if (req.xhr) {
      if (req.user.isAdmin) {
        res.json({ list: TestDrive });
        res.end();
      } else {
        next(new Error("Unauthorised Access"));
        res.end();
      }
    } else {
      next(new Error("Unauthorised Access"));
      res.end();
    }
  },

  getAllAvailability: async (req, res, next) => {
    if (req.xhr) {
      if (req.user.isAdmin) {
        let CheckAvail = await checkAvail
          .find({
            carAuthor: { $ne: req.user._id },
          })
          .sort({ $natural: -1 });
        res.json({ list: CheckAvail });
        res.end();
      }
    } else {
      next(new Error("Unauthorised Access"));
      res.end();
    }
  },

  getAllShipEnq: async (req, res, next) => {
    if (req.xhr) {
      if (req.user.isAdmin) {
        let ShipList = await shipModel
          .find({
            carAuthor: { $ne: req.user._id },
          })
          .sort({ $natural: -1 });
        res.json({ list: ShipList });
        res.end();
      }
    } else {
      next(new Error("Unauthorised Access"));
    }
  },

  deleteTestDrive: async (req, res, next) => {
    await testDrive.deleteOne({ _id: req.body.deleteAd });
    res.redirect(req.header("Referer"));
  },

  deleteAvail: async (req, res, next) => {
    await checkAvail.deleteOne({ _id: req.body.deleteAd });
    res.redirect(req.header("Referer"));
  },

  deleteShip: async (req, res, next) => {
    await shipModel.deleteOne({ _id: req.body.deleteAd });
    res.redirect(req.header("Referer"));
  },

  updateTestDrive: async (req, res, next) => {
    const Test = await testDrive.findOne({ _id: req.body.adSOLD });
    if (Test.status) {
      await testDrive.updateOne(
        { _id: req.body.adSOLD },
        { $set: { status: false } },
        res.redirect(req.header("Referer"))
      );
    } else {
      await testDrive.updateOne(
        { _id: req.body.adSOLD },
        { $set: { status: true } },
        res.redirect(req.header("Referer"))
      );
    }
  },

  updateAvail: async (req, res, next) => {
    const Test = await checkAvail.findOne({ _id: req.body.adSOLD });
    if (Test.status) {
      await checkAvail.updateOne(
        { _id: req.body.adSOLD },
        { $set: { status: false } },
        res.redirect(req.header("Referer"))
      );
    } else {
      await checkAvail.updateOne(
        { _id: req.body.adSOLD },
        { $set: { status: true } },
        res.redirect(req.header("Referer"))
      );
    }
  },

  updateShip: async (req, res, next) => {
    const Test = await shipModel.findOne({ _id: req.body.adSOLD });
    if (Test.status) {
      await shipModel.updateOne(
        { _id: req.body.adSOLD },
        { $set: { status: false } },
        res.redirect(req.header("Referer"))
      );
    } else {
      await shipModel.updateOne(
        { _id: req.body.adSOLD },
        { $set: { status: true } },
        res.redirect(req.header("Referer"))
      );
    }
  },

  getCoupons: async (req, res, next) => {
    if (req.xhr) {
      let offers = await couponModel
        .find({ authorID: req.user._id })
        .sort({ $natural: -1 });
      res.json({ list: offers });
    } else {
      next(new Error("Unauthorised Access"));
    }
  },

  getNoDeals: async (req, res, next) => {
    let NoDeal = await noDealModel
      .find({ carAuthor: req.user._id })
      .sort({ $natural: -1 });
    if (req.xhr) {
      res.json({ list: NoDeal });
      res.end();
    } else {
      next(new Error("Unauthorised Access"));
      res.end();
    }
  },

  updateNoDeal: async (req, res, next) => {
    const NoDeal = await NoDeal.findOne({ _id: req.body.adSOLD });
    if (NoDeal.status) {
      await checkAvail.updateOne(
        { _id: req.body.adSOLD },
        { $set: { status: false } },
        res.redirect(req.header("Referer"))
      );
    } else {
      await checkAvail.updateOne(
        { _id: req.body.adSOLD },
        { $set: { status: true } },
        res.redirect(req.header("Referer"))
      );
    }
  },

  deleteNoDeal: async (req, res, next) => {
    await NoDeal.deleteOne({ _id: req.body.deleteAd });
    res.redirect(req.header("Referer"));
  },
};
