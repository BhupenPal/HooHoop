const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

const Schema = mongoose.Schema;
const NoDealModel = new Schema({
  custEmail: String,
  custPhone: String,
  carVin: String,
  custOffer: String,
  offerDate: String,
  status: String
});

module.exports = mongoose.model("No Deal Queries", NoDealModel);