const auth = async (req, res, next) => {
  const { user } = res.locals;

  if (!user) {
    return res.status(403).send({
      type: "error",
      message: "You are not authorized to access this resource",
    });
  }

  return next();
};

module.exports = auth;
