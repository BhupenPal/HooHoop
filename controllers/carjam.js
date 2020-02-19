const express = require("express");
const Router = express();
const sell_form = require("./sell_form");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({
  extended: !1
});

let vinFigure = "";

Router.set("view engine", "ejs");
Router.use("/assets", express.static("assets"));

Router.post("/car-submit/data", urlencoded, async (req, res) => {

  vinFigure = req.body.vinFigure;
  const carDetails = await fetchData();

  res.render("sell_form", {
    detailedCarObject: await carDetails,
    vinFigured: true
  });

});

function fetchData() {
  const secret = "B2C45C806CBC78480310F6B0401CEE2A4FCCCFD4";
  let urlReq = `https://carjam.co.nz/a/vehicle:abcd?key=${secret}&plate=${vinFigure}`;

  return fetch(urlReq).then(res => res.json());
}


Router.use("/", sell_form);

module.exports = Router;
