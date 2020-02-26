const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

mongoose.connection.on("connected", () =>
  console.log("Mongoose Availability Model Intitialized!!!!")
);

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
  customerID: String,
  vehicleID: String
});

module.exports = mongoose.model("Availability", AvailabilityModel);