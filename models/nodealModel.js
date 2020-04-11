const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

const Schema = mongoose.Schema;
const NoDealModel = new Schema({
  email: String,
  phoneNo: String,
  vinNum: String,
  discount: String,
  date: String,
  status: {
    type: String,
    default: "Active"
  }
});

module.exports = mongoose.model("No Deal Queries", NoDealModel);