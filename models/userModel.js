const mongoose = require("mongoose");

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
    required: true,
    default: false
  },
  resetToken: {type: String, default: null},
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model("Users", UserSchema);
