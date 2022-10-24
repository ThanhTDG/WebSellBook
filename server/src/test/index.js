const { describe, it } = require("mocha");
const request = require("supertest");

const app = require("../index");

describe("Test server", () => {
  it("Should return welcome", (done) => {
    request(app).get("/").expect(200).expect("Welcome to ToiMuaSach API", done);
  });
});
