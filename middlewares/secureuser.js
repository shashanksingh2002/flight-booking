const { isUserLoggedIn } = require('../database/database');

module.exports = {
  secureUserRoute: async (req, res, next) => {
    if (req.baseUrl === '/user/login' || req.baseUrl === '/user/signup') {
      // Allow access to the user login and signup routes
      return next();
    }

    const isLoggedInUser = await isUserLoggedIn(req.body.email);
    if (isLoggedInUser) {
      // User is logged in, allow access to the protected route
      return next();
    } else {
      // User is not logged in, return a "go to login page" message
      return res.json({ "message": "go to login page" });
    }
  }
};
