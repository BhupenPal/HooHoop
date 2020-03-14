const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

const Schema = mongoose.Schema,
  CarSchema = new Schema({
    Price: {
      type: Number,
      required: true
    },
    minPrice: {
      type: Number,
      required: true
    },
    Make: {
      type: String,
      required: true
    },
    Model: {
      type: String,
      required: true
    },
    mYear: String,
    Age: {
      type: Number,
      required: true
    },
    BodyType: {
      type: String,
      required: true
    },
    DoorNum: Number,
    SeatNum: Number,
    ModelDetail: String,
    ImportHistory: String,
    PreviousOwners: String,
    vinNum: {
      type: String,
      required: true,
      unique: true
    },
    kMeters: {
      type: Number,
      required: true
    },
    Colour: String,
    engineSize: Number,
    Transmission: String,
    fuelType: {
      type: String,
      required: true
    },
    cylinderNum: String,
    WoFexpiry: String,
    regExpiry: String,
    DriveWheel4: Boolean,
    RoadCost: Boolean,
    Description: String,
    CarFolder: String,
    photo360: Boolean,
    authorID: String,
    views: Number,
    adActive: String,
    DealerName: String,
    DealerNum: String,
    DealerEmail: String
  });

module.exports = mongoose.model("CarList", CarSchema);
