const { object, string } = require("zod");

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - firstName
 *        - lastName
 *      properties:
 *        email:
 *          type: string
 *          default: john@doe.com
 *        firstName:
 *          type: string
 *          default: John
 *        lastName:
 *          type: string
 *          default: Doe
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: boolean
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
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
