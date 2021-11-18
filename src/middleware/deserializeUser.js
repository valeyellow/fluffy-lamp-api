const { get } = require("lodash");
const logger = require("../utils/logger");

const { verifyJwt } = require("../utils/jwt.utils");

// fetch accessToken from request headers -> verify and add user details to res.locals
// eslint-disable-next-line consistent-return
const deserializeUser = async (req, res, next) => {
  try {
    const accessToken = get(req, "headers.authorization", "").replace(
      /^Bearer\s/,
      "",
    );

    if (!accessToken) return next();

    const { decoded, expired } = await verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    // handle case where token is expired
    if (expired) {
      return res.status(400).send({
        type: "error",
        message: "You have provided a Invalid or expired token",
      });
    }

    next();
  } catch (e) {
    logger.error(e);
  }
};

module.exports = deserializeUser;
