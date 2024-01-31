const app = require("../../../app");
const request = require("supertest");
const { connect, disconnect } = require("../../utils/db-connection");

beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await disconnect();
});

describe("Recomendations", () => {
  test("Product recommendations", (done) => {
    request(app)
      .post("/api/v1/products/recomendation")
      .send({ name: "Stationary Boxes" })
      .then((res) => {
        expect(res.status).toEqual(200);
        done();
      })
      .catch((err) => done(err));
  });
  test("Search Products Result", (done) => {
    request(app)
      .post("/api/v1/products/search")
      .send({ search: "stationary" })
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => done(err));
  });
});
