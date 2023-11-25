const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const {
  errorMiddleware,
  globalErrorMiddleware,
} = require("./middlewares/errorMiddleware");
const helmet = require("helmet");
require("./database/mongoDB");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);
app.use(errorMiddleware);
app.use(globalErrorMiddleware);

app.listen(5000, () => console.log("Server Connected..."));
