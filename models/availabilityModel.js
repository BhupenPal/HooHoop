const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

const Schema = mongoose.Schema;
const AvailabilityModel = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: Number,
    required: true,
  },
  vehicleID: String,
  vinNum: {type: String, required: true},
  car: String,
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  carAuthor: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Availability", AvailabilityModel);