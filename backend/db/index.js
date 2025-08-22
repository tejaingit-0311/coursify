const { Schema, default: mongoose } = require("mongoose");
require("dotenv").config();
//connect db:
async function connectToDB() {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_DB_URL);
  } catch (error) {
    console.error(`Error Occured while connecting to DB ${error}`);
  }
}

const ObjectId = mongoose.Types.ObjectId;

// admin-schema:
const AdminSchema = new Schema({
  // adminId: Types.ObjectId,
  email: { type: String, unique: true },
  username: String,
  password: String,
});

//user-schema:
const UserSchema = new Schema({
  // userId: Types.ObjectId,
  username: { type: String, unique: true },
  password: String,
});

//course-schema:
const CourseSchema = new Schema({
  // courseId: Types.ObjectId,
  title: String,
  description: String,
  price: String,
  imageLink: String,
  published: Boolean,
  adminId: {
    type: ObjectId,
    ref: "admin",
    select: false,
  },
});

//purchased-course-schema:
const PurchasedCourseSchema = new Schema({
  courseId: { type: ObjectId, ref: "courses", select: false },
  userId: { type: ObjectId, ref: "user", select: false },
});

const AdminModel = mongoose.model("admin", AdminSchema);
const UserModel = mongoose.model("user", UserSchema);
const CourseModel = mongoose.model("courses", CourseSchema);
const PurchasedCourseModel = mongoose.model(
  "purchased-course",
  PurchasedCourseSchema,
);

module.exports = {
  connectToDB,
  AdminModel,
  UserModel,
  CourseModel,
  PurchasedCourseModel,
};
