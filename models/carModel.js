const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HooHoop", {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1,
  useFindAndModify: false
});

const Schema = mongoose.Schema,
  CarSchema = new Schema({
    Price: {
      type: Number,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    Make: {
      type: String,
      required: true,
    },
    Model: {
      type: String,
      required: true,
    },
    ModelYear: {
      type: Number,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    BodyType: {
      type: String,
      required: true,
    },
    DoorNum: Number,
    SeatNum: { type: Number, required: true },
    ModelDetail: String,
    ImportHistory: String,
    PreviousOwners: String,
    vinNum: {
      type: String,
      required: true,
      unique: true,
    },
    kMeters: {
      type: Number,
      required: true,
    },
    Colour: { type: String, required: true },
    engineSize: {type: Number, required: true},
    Transmission: {type: String, required: true},
    FuelType: {
      type: String,
      required: true,
    },
    FuelStar: {type: Number, default: null},
    SafetyStar: {type: Number, default: null},
    cylinderNum: String,
    WoFexpiry: String,
    regExpiry: {type: String, required: true},
    DriveWheel4: {type: Number, required: true, default: 2},
    RoadCost: {type: String, default: "Not"},
    Description: String,
    authorID: {type: String, required: true},
    authorEmail: {type: String, required: true},
    views: { type: Number, default: 0 },
    adActive: { type: String, default: "Active" },
    DealerName: String,
    DealerNum: String,
    DealerEmail: String,
    TotFrame: {type: Number, required: true},
    date: {type: String, required: true},
    carAddr: {type: String, default: null}
  });

module.exports = mongoose.model("CarList", CarSchema);
