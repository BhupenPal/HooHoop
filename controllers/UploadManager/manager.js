const carModel = require("../../models/carModel");

module.exports = async (req, res, next) => {
  const exist = await carModel.findOne({
    vinNum: req.headers.platecheck.toUpperCase(),
  });
  if (exist) {
    req.existence = true;
    next();
  } else {
    req.existence = false;
    next();
  }
};
