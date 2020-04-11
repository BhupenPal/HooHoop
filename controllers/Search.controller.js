

module.exports = {
  getCars: async (req, res, next) => {
    res.redirect('/search-car/1')
  },

  getBuyCar: (req, res, next) => {
    if(req.xhr){
      return res.json(res.Paginator)
    } else {
      return res.render('search_car', {info: res.Paginator})
    }
  }
};
