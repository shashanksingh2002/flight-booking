const { isAdminLoggedIn } = require("../database/database");

module.exports = {
  secureAdminRoute: async (req, res, next) => {
    if (req.baseUrl === '/admin/login') {
      // Allow access to the admin login route
      return next();
    }
    else if(!req.body.email.length) return res.json({"message":"Please login to access this feature"});
    else{
        const isLoggedInAdmin = await isAdminLoggedIn(req.body.email);
        if (isLoggedInAdmin) {
        // Admin is logged in, allow access to the protected route
        return next();
        } else {
        // Admin is not logged in, return an "unauthorized" message
        return res.json({ "message": "unauthorized"});
        }
    }
  }
};
