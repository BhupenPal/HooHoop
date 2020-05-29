const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Coupons = new Schema({
    custEmail: String,
    custPhone: String,
    vehicleID: String,
    vehicleObjId: String,
    vehicleName: String,
    CouponCode: String,
    discount: String,
    tod: String,
    tom: String,
    authorID: String,
    carPrice: String,
    trade: String,
    tradeVehicle: String
}, {timestamps: true});

module.exports = mongoose.model("Coupons", Coupons);