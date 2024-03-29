const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ShippingModel = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true
  },
  fromLocation: {
    type: String,
    required: true
  },
  toLocation: {
    type: String, 
    required: true
  },
  transportDate: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  vehicleID: String,
  vinNum: {type: String, required: true},
  carAuthor: {
    type: String,
    required: true
  },
  date: {type: String,
  required: true}
});

module.exports = mongoose.model("Shipment Model", ShippingModel);