const { object, string } = require("zod");

const createUserSchema = object({
  body: object({
    email: string({ required_error: "Email is a required field" }).email(
      "Please enter a valid email",
    ),
    firstName: string({
      required_error: "First name cannot be empty",
    }),
    lastName: string({
      required_error: "Last name cannot be empty",
    }),
  }),
});

module.exports = createUserSchema;
