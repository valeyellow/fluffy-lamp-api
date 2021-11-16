const { Router } = require("express");

const router = Router();

router.get("/api/v1/userCheck", async (req, res) => {
  res.json({ type: "success", message: "Hi from user" });
});

module.exports = router;
