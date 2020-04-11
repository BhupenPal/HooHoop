const carModel = require("../../models/carModel");

module.exports = {
  carsPaginator: async (req, res, next) => {
    const size = 15;
    let pageNo = parseInt(req.params.page);
    let filterParam = req.query;
    filterParam.adActive = "Active";

    if (req.query.car) {
      delete filterParam.car;

      if (filterParam.Price == "") {
        delete filterParam.Price;
      }
      if (filterParam.BodyType == "") {
        delete filterParam.BodyType;
      }
      if (filterParam.FuelType == "") {
        delete filterParam.FuelType;
      }
    }

    if (req.query.enquiry) {
      const regex = new RegExp(escapeRegex(req.query.enquiry), "gi");
      filterParam = {
        $or: [{ Make: regex }, { Model: regex }, { vinNum: regex }],
      };
    } else {
      delete filterParam.enquiry;
    }

    if (filterParam.Price) {
      filterParam.Price = PriceArray(filterParam.Price);
    }

    if (filterParam.kMeters) {
      filterParam.kMeters = PriceArray(filterParam.kMeters);
    }

    if (filterParam.Age) {
      filterParam.Age = PriceArray(filterParam.Age);
    }

    const TotalCars = await carModel.countDocuments(filterParam);
    let EndPage = Math.ceil(TotalCars / size);
    EndPage = EndPage == 0 ? 1 : EndPage;

    if (pageNo < 0 || pageNo == 0 || pageNo > EndPage) {
      return res.redirect("/search-car/1");
    }

    const record = await carModel
      .find(filterParam)
      .skip(size * pageNo - size)
      .limit(size)
      .sort({$natural: -1});

    res.Paginator = {
      record,
      EndPage,
    };
    next();
  }
};

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const PriceArray = (ToCheck) => {
  if (Array.isArray(ToCheck)) {
    lower = parseInt(ToCheck[0].split("-")[0]);
    upper = parseInt(ToCheck[ToCheck.length - 1].split("-")[1]);
    return { $gt: lower, $lt: upper };
  } else {
    lower = parseInt(ToCheck.split("-")[0]);
    upper = parseInt(ToCheck.split("-")[1]);
    return { $gt: lower, $lt: upper };
  }
};
