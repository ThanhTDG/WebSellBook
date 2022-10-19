module.exports = {
  User: {
    type: "object",
    required: ["id", "firstName", "lastName", "email", "phone", "password"],
    properties: {
      id: {
        type: "ObjectId",
      },
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      email: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    example: {
      id: "631b2f6fb87b664e474eed57",
      firstName: "An",
      lastName: "Nguyen Van",
      email: "an@gmail.com",
      phone: "0123456789",
      password: "$2b$10$07DxsgvD7umWL5uOxW9c/O/PUZS6k0bMdu1sL3dqIUn8grTIlvnsm",
    },
  },
};
