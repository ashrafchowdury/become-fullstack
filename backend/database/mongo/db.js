const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/grocery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Ok"))
  .catch((err) => console.log("Connection Error"));
