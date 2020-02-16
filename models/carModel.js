const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1
});

mongoose.connection.on("connected", () =>
  console.log("Mongoose Car Model Intitialized!!!!")
);

const Schema = mongoose.Schema,
  CarSchema = new Schema({
    Price: {
      type: Number,
      required: false
    },
    minPrice: {
      type: Number,
      required: false
    },
    Make: {
      type: String,
      required: false
    },
    Model: {
      type: String,
      required: false
    },
    ModelYear: {
      type: Number,
      required: false
    },
    BodyType: {
      type: String,
      required: false
    },
    DoorNum: Number,
    SeatNum: Number,
    ModelDetail: String,
    ImportHistory: String,
    PreviousOwners: String,
    vinNum: {
      type: String,
      required: false,
      unique: false
    },
    kMeters: {
      type: Number,
      required: false
    },
    Colour: String,
    engineSize: Number,
    Transmission: String,
    fuelType: {
      type: String,
      required: false
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
    authorName: String,
    authorNumber: String,
    authorMail: String,
    Approved: Boolean
  });

module.exports = mongoose.model("CarList", CarSchema);
