const userRouter = require("./routers/user.router");
const postRouter = require("./routers/post.router");
const commentRouter = require("./routers/comment.router");
const authRouter = require("./routers/auth.router");

const routes = async (app) => {
  app.use(userRouter);
  app.use(postRouter);
  app.use(commentRouter);
  app.use(authRouter);
};

module.exports = routes;
