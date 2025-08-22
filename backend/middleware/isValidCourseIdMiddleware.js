const mongoose = require("mongoose");
function isValidCourseIdMiddleware(req, res, next) {
  try {
    const courseId = req.params.courseId;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_FORMAT", message: "Provide a valid Id" },
      });
    }
    next();
  } catch (error) {
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
  isValidCourseIdMiddleware,
};
