const express = require("express");
const app = express();
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
require("./database/mongoDB");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRoute);
app.use(productRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.listen(5000, () => console.log("Server Connected..."));
