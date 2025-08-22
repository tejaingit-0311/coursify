const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const { adminRouter } = require("./routes/admin");
const { userRouter } = require("./routes/user");
const { connectToDB } = require("./db/index");

//Middleware:
app.use(express.json());

//Routers:
app.use("/admins", adminRouter);
app.use("/users", userRouter);

//PORT:
const PORT = dotEnv.configDotenv().parsed.PORT || 3001;

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
