const { findEmail } = require("../service/auth.service");
const { createUser } = require("../service/user.service");

const userHealthCheckHandler = async (req, res) => {
  res.send("Hi from user controller");
};

const createUserHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const emailDocument = await findEmail({ email });
    if (!emailDocument || !emailDocument?.isVerified) {
      return res.status(401).send({
        type: "error",
        message: "You have entered an unregistered email address",
      });
    }
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
