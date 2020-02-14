const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0
});

mongoose.connection.on("connected", () =>
  console.log("Mongoose is connected!!!!")
);

const Schema = mongoose.Schema,
  CarSchema = new Schema({
    Make: String,
    Model: String,
    ModelYear: Number,
    BodyType: String,
    DoorNum: Number,
    SeatNum: Number,
    ModelDetail: String,
    ImportHistory: String,
    PreviousOwners: String,
    vinNum: String,
    kMeters: Number,
    Colour: String,
    engineSize: Number,
    Transmission: String,
    fuelType: String,
    cylinderNum: String,
    WoFexpiry: String,
    regExpiry: String,
    DriveWheel4: Boolean,
    RoadCost: Boolean,
    Description: String,
    CarFolder: String,
    photo360: Boolean,
    author: ObjectId,
    authorEmail: Boolean,
    authorNumber: Boolean
  });

module.exports = mongoose.model("CarList", CarSchema);
