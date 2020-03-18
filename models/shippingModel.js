const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

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
    required: true
  },
  customerID: String,
  vehicleID: String,
  carAuthor: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Shipment Model", ShippingModel);