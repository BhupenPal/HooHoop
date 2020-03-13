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

Router.post("/car-submit/data", ensureAuthenticated, urlencoded, async (req, res) => {

  vinFigure = req.body.vinFigure;
  const carDetails = await fetchData();

  if (carDetails.body_style == "CV") {
    carDetails.body_style = "Convertible";
  } else if (carDetails.body_style == "HA") {
    carDetails.body_style = "Hatchback";
  } else if (carDetails.body_style == "HV") {
    carDetails.body_style = "Heavy Van";
  } else if (carDetails.body_style == "LV") {
    carDetails.body_style = "Light Van";
  } else if (carDetails.body_style == "SW") {
    carDetails.body_style = "Station Wagon";
  } else if (carDetails.body_style == "UT") {
    carDetails.body_style = "Utility";
  } else if (carDetails.body_style == "SL") {
    carDetails.body_style = "Sedan";
  } else if (carDetails.body_style == "SP") {
    carDetails.body_style = "Sports Car";
  } else {
    carDetails.body_style = "Other";
  }

  if (carDetails.fuel_type == 01) {
    carDetails.fuel_type = "Petrol";
  } else if (carDetails.fuel_type == 02) {
    carDetails.fuel_type = "Diesel";
  } else if (carDetails.fuel_type == 03) {
    carDetails.fuel_type = "CNG";
  } else if (carDetails.fuel_type == 04) {
    carDetails.fuel_type = "LPG";
  } else if (carDetails.fuel_type == 05) {
    carDetails.fuel_type = "Electric";
  } else if (
    carDetails.fuel_type == 93 ||
    07 ||
    08 ||
    09 ||
    10 ||
    11 ||
    12 ||
    91 ||
    92 ||
    94 ||
    95 ||
    96
  ) {
    carDetails.fuel_type = "Hybrid";
  } else {
    carDetails.fuel_type = "Other";
  }

  if (carDetails.transmission.includes("automatic")) {
    carDetails.transmission = "Automatic";
  } else if (carDetails.transmission.includes("manual")) {
    carDetails.transmission = "Manual";
  } else if (carDetails.transmission.includes("triptonic")) {
    carDetails.transmission = "Triptonic";
  }

  res.render("sell_form", {
    vinFigure: vinFigure,
    detailedCarObject: await carDetails || {},
    vinFigured: true
  });
});

Router.get("/car-submit/data", async (req, res) => {
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

async function fetchData() {
  const secret = process.env.API_KEY;
  let urlReq = `https://carjam.co.nz/a/vehicle:abcd?key=${secret}&plate=${vinFigure}`;
  return await fetch(urlReq).then(res => res.json());
}

Router.use("/", sell_form);

module.exports = Router;