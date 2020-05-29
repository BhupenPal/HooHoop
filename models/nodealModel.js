const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NoDealModel = new Schema({
  email: String,
  phoneNo: String,
  vinNum: String,
  uLastOffer: String,
  date: String,
  car: String,
  carAuthor: String,
  status: {
    type: Boolean,
    default: true,
    required: true
  }
});

module.exports = mongoose.model("No Deal Queries", NoDealModel);