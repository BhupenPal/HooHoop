const carModel = require("../../models/carModel");

module.exports = async (req, res, next) => {
  const exist = await carModel.findOne({
    vinNum: req.headers.platecheck.toUpperCase(),
  });
  if (exist) {
    res.send("CAR ALREADY EXISTS");
    res.end();
  } else {
    next();
  }
};
