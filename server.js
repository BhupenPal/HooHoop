const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

//Connect Flash
const flash = require("connect-flash");

//Express-Session Config
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Connect Flash
app.use(flash());

// Global variables for connect-flash
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const landing = require("./controllers/landing");
app.use("/", landing);

const PORT = process.env.PORT || 8080;
app.listen(8080, console.log(`Server has started at PORT ${PORT}`));
