// middlewares/requireLogin.js
function requireLogin(req, res, next) {
    if (!req.session.userId) {
      return res.redirect('/users/login');
    }
    next();
  }
  
  module.exports = requireLogin;  