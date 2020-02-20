const express = require('express');
const Router = express.Router();
const userModel = require('../../models/userModel');

const bodyParser = require("body-parser");
const urlencoded = bodyParser.urlencoded({ extended: !1 });

// Verify User
Router.get("/user/verify", urlencoded, async(req, res) => {
    const secretToken = req.query.token;

    const user = await userModel.findOne({secretToken: secretToken});
    if(!user) {
        req.flash('error', 'No User found');
        res.redirect('/sign-up');
        return;
    }

    user.secretToken = null;
    user.active = true;
    user.save();

    res.render("emailVer", {userVerified: true});
})

module.exports = Router;