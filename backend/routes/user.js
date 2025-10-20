//user-router:
const userRouter = require("express").Router();
const { UserModel, CourseModel } = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middleware/userMiddleware");
const { PurchasedCourseModel } = require("../db/index");
require("dotenv").config();
//signup:
userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    //check for empty values:
    if (email === "" || password === "")
      return res.status(400).json({
        success: false,
        code: "EMPTY_FIELDS",
        message: "Please provide username or password",
      });
    console.log(email, " ", password);

    //hash-password:
    const hashedPassword = await bcrypt.hash(password, 8);

    // add-details:
    try {
      await UserModel.create({ email: email, password: hashedPassword });
      //generate a token:

      res.status(201).json({
        success: true,
        data: {
          code: "REGISTERED_SUCCESSFULLY",
          message: "You have Registered Successfully",
        },
      });
    } catch (error) {
      console.log(error);
      res.status(409).send({
        success: false,
        error: {
          code: "USER_ALREADY_EXISTS",
          message: "User Already Exists",
        },
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: { code: "BAD_REQUEST", message: "Invalid Request" },
    });
  }
});

//signin:
userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.query;

    //if either of it doesn't exist:
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: "EMPTY_FIELDS",
          message: "Please provide username and password",
        },
      });
    }

    //find-user:
    const user = await UserModel.findOne({email: email});
    // console.log(user);
    //1. user=null;
    //2. user = {name:"ravi", password:"123"};

    if (!user || !(await bcrypt.compare(password, user.password))) {
      if(!user)
        console.log(`User Not Found`);
      else
        console.log(`Incorrect Password`);
      return res
        .status(401)
        .json({
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email or password",
          },
        }); 
    }
    

    //give-token:
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,  // use true only on HTTPS
      path:"/"
    });
    res.status(200).
      json({
        success: true,
        data: {
          code: "LOGIN_SUCCESSFUL",
          message: "Logged In Successfully",
          token,
        },
      })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: { code: "BAD_REQUEST", message: "Invalid Request" },
    });
  }
});

//signout:
userRouter.post("/signout", (req,res)=>{
  try{
    //clear the cookie:
    //invalidate the token:
    const token = req.cookies['token'];
    console.log(token);
    res.status(200).clearCookie("token").json({success: true, data:{code: "LOGOUT_SUCCESSFUL", message:"Logged Out Successfully"}});
  }catch(error){
    console.error(error);
    res.sendStatus(500);
  }

});

//view-all-courses:
userRouter.get("/courses", async (req, res) => {
  try {
    let courses = await CourseModel.find().select("-__v");
    // console.log({ courses });
    res.status(200).json({
      success: true,
      data: { code: "VIEW_COURSES", message: "View All Courses", courses },
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

//authenticate-req/Interception:
userRouter.use(userMiddleware);

//purchase-a-course:
userRouter.post("/courses/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;
    try {
      const course = await PurchasedCourseModel.create({
        courseId: courseId,
        userId: userId,
      });
      console.log(course);
      res.status(200).json({
        success: true,
        data: {
          code: "PURCHASE_SUCCESSFUL",
          message: "Course Purchased Successful",
        },
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid Request" },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: { code: "BAD_REQUEST", message: "Invalid Request" },
    });
  }
});

//view-all-purchased-courses:
userRouter.get("/courses/purchasedCourses", async (req, res) => {
  try {
    const userId = req.userId;
    try {
      //get all courses based on a user:
      const purchasedCoursesAll = await PurchasedCourseModel.find({
        userId: userId,
      })
        .populate("courseId")
        .select("-__v");
      const purchasedCourses = purchasedCoursesAll.map((c) => c.courseId);
      res.status(200).json({
        success: true,
        data: {
          code: "FETCH_SUCCESS",
          message: "Course Fecthed Successfully",
          purchasedCourses,
        },
      });
    } catch (error) {
      //connection timed out/ queryError:
      console.log(error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something Went Wrong",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: { code: "BAD_REQUEST", message: "Invalid Request" },
    });
  }
});

module.exports = {
  userRouter,
};
