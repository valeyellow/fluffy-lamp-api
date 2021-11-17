const {
  createPost,
  findPost,
  findAndUpdatePost,
  deletePost,
} = require("../service/post.service");

const postHealthCheckHandler = async (req, res) => {
  res.send("Hi from post controller");
};

const createPostHandler = async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.send(post);
  } catch (error) {
    res
      .status(400)
      .send({ type: "error", message: "Could not create new post" });
  }
};

// find the post -> update each field present in req.body -> return the updated user
const updatePostHandler = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await findPost({ _id: postId });
    if (!post) {
      return res.status(404).send({ type: "error", message: "Post not found" });
    }

    const updatedKeys = Object.keys(req.body);

    updatedKeys.forEach((key) => {
      post[key] = req.body[key];
    });

    const updatedPost = await findAndUpdatePost({ _id: postId }, post, {
      new: true,
    });

    return res.send(updatedPost);
  } catch (e) {
    res
      .status(500)
      .send({ type: "error", message: e?.message || "Could not update post" });
  }
};

const deletePostHandler = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await findPost({ _id: postId });
    if (!post) {
      return res.status(404).send({ type: "error", message: "Post not found" });
    }

    const deletedPost = await deletePost({ _id: postId });
    return (
      res
        .status(200)
        .send(deletedPost)
    );
  } catch (e) {
    res
      .status(500)
      .send({ type: "error", message: e?.message || "Could not delete post" });
  }
};

module.exports = {
  postHealthCheckHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
};
