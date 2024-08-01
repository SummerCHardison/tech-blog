//***NOTICE***
// this file is heavily modled after the auth.js file in activity 28 mini project for module 14

const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;