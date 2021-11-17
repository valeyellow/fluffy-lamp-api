/**
 * Middleware to parse input schema object
 * @param {AnyZodObject} schema
 * @returns
 * if successful, invokes the next function
 * else, returns the error as response
 */
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    res.status(400).json({ type: "error", message: error });
  }
};

module.exports = validate;
