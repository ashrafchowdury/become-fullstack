const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectDB: (callBack) => {
    MongoClient.connect("mongodb://localhost:27017/grocery")
      .then((client) => {
        dbConnection = client.db();
        return callBack();
      })
      .catch((error) => {
        console.log(error);
        return callBack(error);
      });
  },
  getDB: () => dbConnection,
};

// Explenation
/****
module.exports = {
  connectDB: (callBack) => {  > this function will help us to connect to databse or stublish the database
    MongoClient.connect("mongodb://localhost:27017/grocery")  > connect to databse with url
      .then((client) => {  > client return the database
        dbConnection = client.db(); > initilize database
        return callBack();  > this callBack() will call after successfull connection with database
      })
      .catch((error) => {
        console.log(error);
        return callBack(error);
      });
  },
  getDB: () => dbConnection,  > this function will return databse connection to communicate with the databse
};
*****/
