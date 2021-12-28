const express = require("express");
const { Post, User, Image } = require("../database/models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [{ model: User }, { model: Image }],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
