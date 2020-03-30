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
    couponCode: String,
    couponAmount: String,
    validFrom: String,
    validTo: String,
    ownerID: String,
    carPrice: String
}, {timestamps: true});

module.exports = mongoose.model("Coupons", Coupons);