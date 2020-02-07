const express = require('express');
const Router = express();
const fetch = require("node-fetch");
const reqNum='KZF737';
const secret = 'B2C45C806CBC78480310F6B0401CEE2A4FCCCFD4';
const urlReq = `https://carjam.co.nz/a/vehicle:abcd?key=${secret}&plate=${reqNum}`

Router.set('view engine', 'ejs')

Router.get("/hello", async(req, res) => {
    const obj = await fetchData()
    res.render("landingPage", { obj });
});
  
function fetchData(){
  return fetch(urlReq)
      .then(res => res.json())
      .then(res => console.log(res))
}

module.exports = Router;