const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const { adminRouter } = require("./routes/admin");
const { userRouter } = require("./routes/user");
const { connectToDB } = require("./db/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//Middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: ["https://coursifyapp.vercel.app","http://10.104.217.162:8080","http://localhost:3001","http://localhost:8080", "http://192.168.56.1:3000","http://localhost:3000"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}
app.use(cors(corsOptions));
app.use(cookieParser());

// Routers:
app.use("/admins", adminRouter);
app.use("/users", userRouter);

//PORT:
const PORT = dotEnv.configDotenv().parsed.PORT || 3002;

connectToDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    }),
  )
  .catch((e) => {
    console.log(e);
    console.error("Error while starting app");
  });
