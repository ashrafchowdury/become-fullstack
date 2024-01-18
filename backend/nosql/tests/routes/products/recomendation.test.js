const app = require("../../../server");
const client = require("../../../libs/redis");
const request = require("supertest");
const mongoose = require("mongoose");

describe("Test Product Recomendations", (done) => {
  test("Product recomendations", () => {
    request(app)
      .post("/api/v1/products/recomendation")
      .send({ name: "Leather card" })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err) => done(err));
  });
});
