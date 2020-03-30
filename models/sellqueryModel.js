const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

const Schema = mongoose.Schema,
  SellSchema = new Schema({
    custEmail: String,
    custPhone: String,
    custVIN: String,
    discountFor: String,
    custDiscount: String,
    custDiscDate: String,
    couponCode: String,
    status: String
  });

module.exports = mongoose.model("Sell Queries", SellSchema);
