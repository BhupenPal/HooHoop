const express = require('express');
const Router = express.Router();

const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({ extended: !1 });

// Verify User
Router.get("/user/verify", (req, res) => {
    res.render("emailVer");
})
  
Router.post("/user/verify", urlencoded, async (req, res, next) => {

})

module.exports = Router;