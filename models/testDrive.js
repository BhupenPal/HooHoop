const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

// mongoose.connection.on("connected", () =>
//   console.log("Mongoose Test Drive Model Intitialized!!!!")
// );

const Schema = mongoose.Schema;
const TestDrive = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true
  },
  customerID: String,
  vehicleID: String
});

module.exports = mongoose.model("Test Drive", TestDrive);