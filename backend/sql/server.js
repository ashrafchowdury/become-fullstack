const express = require("express");
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute.js");

// intilization
const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/products", productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server connnected...");
});
