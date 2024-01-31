const mongoose = require("mongoose");

const database = () =>
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = database;
