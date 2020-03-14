const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNum: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: String,
  secretToken: String,
  active: {
    type: Boolean,
    required: true
  },
  resetToken: String,
  adminStatus: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Users", UserSchema);
