const schemas = require("./schemas.doc");
const auth = require("./auth");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "API Document",
    description: "REST API application made with Express.",
    contact: {
      name: "Duong Hieu",
      email: "1914745@dlu.edu.vn",
      url: "https://github.com/DuongHieu0712z",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development API server",
    },
  ],
  // tags: {
  //   name: "Auth",
  // },
  components: { ...schemas },
  paths: { ...auth },
};
