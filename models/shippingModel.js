const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

// mongoose.connection.on("connected", () =>
//   console.log("Mongoose Shipping Model Intitialized!!!!")
// );

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
  fromLocation: String,
  toLocation: {
    type: String, 
    required: true
  },
  transportDate: {
    type: Date,
    required: true
  },
  note: String,
  customerID: String,
  vehicleID: String
});

module.exports = mongoose.model("Shipment Model", ShippingModel);