const express = require("express");
const app = express();
const { getDB, connectDB } = require("../../database/mongo/mongoDB");

// express middlwwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// databse connection
let database;
connectDB((error) => {
  if (!error) {
    app.listen(5000, () => console.log("Server Connected..."));
    database = getDB();
  }
});

// functions
const getData = (collection, res) => {
  const data = [];
  database
    .collection(collection)
    .find()
    .forEach((item) => data.push(item))
    .then(() => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "error" });
    });
};

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.get("/products", (req, res) => {
  getData("products", res);
});

app.get("/cart", async (req, res) => {
  getData("carts", res);
});

app.post("/cart", (req, res) => {
  const product = req.body;
  database
    .collection("carts")
    .insertOne(product)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "error" });
    });
});

app.delete("/cart", (req, res) => {
  database
    .collection("carts")
    .deleteOne({ _id: req.body.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not delete document" });
    });
});

app.post("/order", async (req, res) => {
  const order = req.body;
  const ids = order.items.map((item) => item._id);
  database
    .collection("orders")
    .insertOne(order)
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "error" });
    });

  database
    .collection("carts")
    .deleteMany({ _id: { $in: ids } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not delete document" });
    });
});
