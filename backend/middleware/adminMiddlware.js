//middlware-logic:
require("dotenv").config();
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  // console.log(req);
  //extract token from header -> verify token with SIGN ->delegate the req
  try {
    const authToken = req.headers["authorization"].substring(7);

    // console.log(authToken);
    try {
      const adminUser = jwt.verify(authToken, process.env.JWT_SECRET);
      const adminUserData = 
      {
        adminUserId :adminUser.id,
        adminUserEmail :adminUser.email
      }
      req.adminUser = adminUserData;
      // console.log(req.adminUserId);
      next();
    } // for invalid token: send a generic response , and log actual error in different file:S
    catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        error: { code: "UNAUTHORIZED", message: "Cannot Access Content" },
      });
      res.clearCookie("token");
      return;
    }
  } catch (error) {
    // res.status(500).json();
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
