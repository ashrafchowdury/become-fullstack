const app = require("../../../server");
const client = require("../../../libs/redis");
const request = require("supertest");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/grocery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  client.disconnect();
});

test("Get ALL Products", (done) => {
  request(app)
    .get("/api/v1/products/all-products")
    .then((response) => {
      expect(response.status).toEqual(200);
      done();
    })
    .catch((error) => done(error));
});
