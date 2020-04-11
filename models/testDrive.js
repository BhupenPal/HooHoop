const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1,
});

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
  vehicleID: {
    type: String,
    required: true
  },
  vinNum: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  car: String,
  carAuthor: {
    type: String,
    required: true
  },
  date: {type: String,
  required: true}
});

module.exports = mongoose.model("Test Drive", TestDrive);
