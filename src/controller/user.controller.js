const dotenv = require("dotenv");

const { signJwt } = require("../utils/jwt.utils");
const { findEmail } = require("../service/auth.service");
const { createUser } = require("../service/user.service");

dotenv.config();

const accessTokenTtl = process.env.ACCESS_TOKEN_TTL;

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
    // create and send access token
    const accessToken = await signJwt(
      { ...user.toObject() },
      { expiresIn: accessTokenTtl },
    );
    res.status(200).send({ ...user.toObject(), accessToken });
  } catch (error) {
    res.status(409).send({ status: "error", message: error });
  }
};

module.exports = {
  userHealthCheckHandler,
  createUserHandler,
};
