const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const reviewRoute = require("./routes/reviewRoute.routes");
const {
  errorMiddleware,
  globalErrorMiddleware,
} = require("./middlewares/errorMiddleware");
const helmet = require("helmet");
require("./database/mongoDB");
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/product/reviews", reviewRoute);
app.use("/api/v1/order", orderRoute);

// error middleware
app.use(errorMiddleware);
app.use(globalErrorMiddleware);

app.listen(5000, () => console.log("Server Connected..."));
