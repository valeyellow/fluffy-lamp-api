const userRouter = require("./routers/user.router");

const routes = async (app) => {
  app.use(userRouter);
};

module.exports = routes;
