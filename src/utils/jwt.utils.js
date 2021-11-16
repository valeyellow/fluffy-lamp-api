const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

export const signJwt = async (payload, options) => jwt.sign(payload, privateKey, {
  ...(options && options),
  algorithm: "RS256",
});

export const verifyJwt = async (token) => {
  try {
    const { decoded } = jwt.verify(token, publicKey);
    return {
      isValid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      isValid: false,
      expired: error?.message === "jwt expired",
      decoded: null,
    };
  }
};
