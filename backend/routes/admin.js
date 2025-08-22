const adminRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { AdminModel, CourseModel } = require("../db/index");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/adminMiddlware");
const { isValidCourseIdMiddleware } = require("../middleware/isValidCourseIdMiddleware");
const { ObjectId } = require("mongoose").Types;
require("dotenv").config();
//signup
adminRouter.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (email === "" || username === "" || password === "")
      return res.status(400).json({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Please provide username or password",
      });

    //hash-password -> store to DB:
    const hashedPassword = await bcrypt.hash(password, 8);

    //check if user already exists:
    try {
      //post the details in DB:
      await AdminModel.create({
        email: email,
        username: username,
        password: hashedPassword,
      });
      res.status(201).send({
        success: true,
        code: "REGISTERED_SUCCESSFULLY",
        message: "User Registered Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(409).send({
        success: true,
        error: {
          code: "USER_ALREADY_EXISTS",
          message: "User Already Exists/ User Already Taken",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
});

//signin:
adminRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.query;
    //get the user:
    const adminUser = await AdminModel.findOne({ email: email });
    // console.log(adminUser);
    //compare password:
    const isCorrect = await bcrypt.compare(password, adminUser.password);

    //if either of it(email, password) is incorrect:
    if (!isCorrect) {
      //req is correct but, failed to authenticate user as invalid credentials:
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password.",
        },
      });
    }

    //get userid -> sign into jwt -> give back res
    const token = jwt.sign(
      {
        id: adminUser._id,
        email: adminUser.email,
      },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET,
    );

    console.log({ token: token, userDetails: adminUser });
    res.status(200).json({
      success: true,
      data: {
        token: token,
        code: "LOG_IN_SUCCESSFUL",
        message: "Logged in Successfully",
      },
    });
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
});

//authenticate-user:
adminRouter.use(adminMiddleware);

//get-all-courses:
adminRouter.get("/courses", async (req, res) => {
  try {
    //extract id from headers:
    const adminUserId = req.adminUserId;

    //covert adminUserId type String to ObjectId:
    const adminId = new ObjectId(adminUserId);

    //query the DB to get all the courses:
    const courses = await CourseModel.find({ adminId });

    res.status(200).json({ success: true, data: { courses: courses } });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong. Please try again later.",
      },
    });
  }
});
//create-a-course:
adminRouter.post("/courses", async (req, res) => {
  try {
    const { title, description, price, imageLink, published } = req.body;
    const adminUserId = req.adminUserId;
    const course = await CourseModel.create({
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
      published: published,
      adminId: adminUserId,
    });
    console.log(course);
    const courseId = course._id;
    // courseId will be
    res.status(201).json({
      success: true,
      data: {
        code: "COURSE_CREATED",
        message: "Course Created Successfully",
        courseId,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something Went Wrong",
      },
    });
  }
});

//update-a-course:
adminRouter.put(
  "/courses/:courseId",
  isValidCourseIdMiddleware,
  async (req, res) => {
    try {
      const { courseId } = req.params;
      // const adminUserId = req.adminUserId;
      console.log(req.params);
      const { title, description, imageLink, price, published } = req.body;
      const result = await CourseModel.findByIdAndUpdate(
        { _id: courseId },
        {
          title: title,
          description: description,
          price: price,
          imageLink: imageLink,
          published: published,
        },
      );
      console.log(result);
      if (result) {
        res.status(200).json({
          success: true,
          data: {
            code: "UPDATE_SUCCESSFUL",
            message: "Course Updated Successfully",
          },
        });
      } else {
        res.status(404).json({
          success: false,
          error: {
            code: "ID_NOT_FOUND",
            message: "Please Provide a Suitable ID",
          },
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something Went Wrong",
        },
      });
    }
  },
);

//remove-a-course:
adminRouter.delete(
  "/courses/:courseId",
  isValidCourseIdMiddleware,
  async (req, res) => {
    try {
      const { courseId } = req.params;
      //check for a vaild courseId:
      const result = await CourseModel.deleteOne({ _id: courseId });
      //id-not-found:
      if (result.deletedCount !== 1) {
        return res.status(404).send({
          success: false,
          error: { code: "ID_NOT_FOUND", message: "ID doesn't exist" },
        });
      }
      //delete-success:
      res.status(204).send({
        success: true,
        data: {
          code: "DELETE_SUCCESSFUL",
          message: "Course Deleted Successfully",
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something Went Wrong",
        },
      });
    }
  },
);

module.exports = {
  adminRouter,
};
