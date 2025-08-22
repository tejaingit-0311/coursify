//middlware-logic:
require("dotenv").config();
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
  // console.log(req);
  //extract token from header -> verify token with SIGN ->delegate the req
  try {
    let authToken = req.headers["authorization"];
    if (!authToken) {
      res.status(401).send({
        success: false,
        error: { code: "TOKEN_NOT_FOUND", message: "Token was not there" },
      });
      return;
    }
    console.log(authToken);
    const token = authToken.substring(7, authToken.length);
    console.log(token);
    // console.log(token);

    try {
      const adminUser = jwt.verify(token, process.env.JWT_SECRET);
      req.adminUserId = adminUser.id;
      // console.log(req.adminUserId);
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_TOKEN", message: "Not a Correct Token" },
      });
    }
  } catch (error) {
    // res.status(500).json();
    // res.status(500).json({success:false , error: {code: "INTERNAL_SERVER_ERROR", message: "Something Went Wrong"}});
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
