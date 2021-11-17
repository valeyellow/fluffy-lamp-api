const { get } = require("lodash");
const logger = require("../utils/logger");

const { verifyJwt } = require("../utils/jwt.utils");

// fetch accessToken from request headers -> verify and add user details to res.locals
const deserializeUser = async (req, res, next) => {
  try {
    const accessToken = get(req, "headers.authorization", "").replace(
      /^Bearer\s/,
      "",
    );
    if (!accessToken) return next();

    const { decoded } = verifyJwt(accessToken);
    if (decoded) {
      res.locals.user = decoded;
    }
    return next();
  } catch (e) {
    logger.error(e);
  }
};

module.exports = deserializeUser;
