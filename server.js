const express = require("express");
const app = express();

//View Engine & Static File Routing
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

//Environment Variables
require("dotenv").config();

//Parsing Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongoose Intialized
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

// Passport Config
const passport = require("passport");
require("./controllers/log/passport")(passport);

//Connect Flash
const flash = require("connect-flash");

//Express-Session Config
const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

//Connect Flash
app.use(flash());

//Global variables for connect-flash
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  if (req.isAuthenticated) {
    res.locals.user = req.user || null;
  }
  next();
});

//Deleting Coupons after 72HOURS
const mdq = require("mongo-date-query");
var schedule = require("node-schedule");
var couponModels = require("./models/couponModel");
schedule.scheduleJob("0 0 * * *", async function () {
  await couponModels.deleteMany({
    createdAt: mdq.previousDays(3),
  });
});

app.use("/", require("./routes/Home.routes"));
app.use("/sell-car", require("./routes/Sell.routes"));
app.use("/user", require("./routes/User.routes"));
app.use('/search-car', require('./routes/Search.routes'));

app.use((req, res, next) => {
  const err = new Error("Error 404! Not Found!");
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  const ErrorCode = err.status || 500;
  const ErrorMsg = err.message || "Internal server error";
  res.render('ErrorPage', {ErrorCode: ErrorCode, ErrorMsg: ErrorMsg})
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server has started at PORT ${PORT}`));
