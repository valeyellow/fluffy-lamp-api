const { createUser } = require("../service/user.service");

const userHealthCheckHandler = async (req, res) => {
  res.send("Hi from user controller");
};

const createUserHandler = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(409).send({ status: "error", message: error });
  }
};

module.exports = {
  userHealthCheckHandler,
  createUserHandler,
};
