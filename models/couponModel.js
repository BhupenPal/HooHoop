const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

const Schema = mongoose.Schema;
const Coupons = new Schema({
    custEmail: String,
    custPhone: String,
    vehicleID: String,
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