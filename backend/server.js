const express = require("express");
const app = express();
// const authRoute = require("./routes/authRoute");
const groceryRoute = require("./routes/groceryRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(authRoute);
app.use(groceryRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.listen(5000, () => console.log("Server Connected..."));
