const express = require("express");
const app = express();
const authRoute = require("./routes/auth.routes");
const productRoute = require("./routes/product.routes");
const orderRoute = require("./routes/order.routes");
const reviewRoute = require("./routes/review.routes");
const {
  errorMiddleware,
  globalErrorMiddleware,
} = require("./middlewares/error.middleware");
const helmet = require("helmet");

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

module.exports = app;
