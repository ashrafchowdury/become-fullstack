const app = require("./app");
require("dotenv").config();
const database = require("./database/index");

const PORT = process.env.PORT || 5000;

database()
  .then(() => {
    console.log("databse has listening and connected");
    app.listen(PORT, () => console.log("Server Connected..."));
  })
  .catch((err) => {
    console.log("Databse has crashed", err);
  });
