const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const {
  errorMiddleware,
  globalErrorMiddleware,
} = require("./middlewares/errorMiddleware");
require("./database/mongoDB");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRoute);
app.use(productRoute);
app.use(errorMiddleware);
app.use(globalErrorMiddleware);

app.listen(5000, () => console.log("Server Connected..."));
