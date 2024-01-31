const mongoose = require("mongoose");
const client = require("../../libs/redis");
require("dotenv").config();

const connect = async () => {
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const disconnect = async () => {
  await mongoose.connection.close();
  client.disconnect();
};

module.exports = { connect, disconnect };
