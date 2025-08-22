//Authentication:
const jwt = require("jsonwebtoken");
require("dotenv").config();
function userMiddleware(req, res, next) {
  try {
    // console.log(req.headers["authorization"]);
    const token = req.headers["authorization"].substring(7);
    // console.log(token);
    //verify-token:
    try {
      let user = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = user.userId;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication failed, Please try again later",
        },
      });
    }
  } catch (error) {
    console.log(error);
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
  userMiddleware,
};
