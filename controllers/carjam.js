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