const express = require("express");
const Router = express();
const sell_form = require("./sell_form");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({
  extended: !1
});

let vinFigure = "";

const { ensureAuthenticated } = require("./log/auth");

Router.set("view engine", "ejs");
Router.use("/assets", express.static("assets"));

Router.get("/car-submit/data", ensureAuthenticated, async (req, res) => {
  if(req.xhr){
    vinFigure = req.query.Plate;
    const secret = process.env.API_KEY;
    let urlReq = `https://carjam.co.nz/a/vehicle:abcd?key=${secret}&plate=${vinFigure}`;
    carDetails = await fetch(urlReq).then(res => res.json());
    res.json(carDetails)
  } else {
    res.send('Link not accessible')
  }
})

Router.use("/", sell_form);

module.exports = Router;