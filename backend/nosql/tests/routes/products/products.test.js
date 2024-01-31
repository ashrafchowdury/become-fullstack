const app = require("../../../app");
const request = require("supertest");
const { connect, disconnect } = require("../../utils/db-connection");

beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await disconnect();
});

test("Get ALL Products", (done) => {
  request(app)
    .get("/api/v1/products/all-products")
    .then((res) => {
      expect(res.status).toEqual(200);
      done();
    })
    .catch((err) => done(err));
});
