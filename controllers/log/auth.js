module.exports = {
  ensureAuthenticated: function (req, res, next) {
    req.session.redirectTo = req.originalUrl;
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/user/login");
  },

  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/user/dashboard");
  }
};
