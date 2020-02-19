const express = require('express');
const Router = express.Router();
const userModel = require('../../models/userModel');

const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({ extended: !1 });

// Verify User
Router.get("/user/verify", (req, res) => {
    res.render("emailVer");
})
  
Router.post("/user/verify", urlencoded, async (req, res) => {
    const secretToken = req.body.secretToken;
    const user = await userModel.findOne({secretToken: secretToken});
    if(!user) {
        req.flash('error', 'No User found');
        res.redirect('/sign-up');
        return;
    }

    user.secretToken = null;
    user.active = true;
    await user.save();

    req.flash('success', 'User verified');
    res.redirect("/login")
})

module.exports = Router;