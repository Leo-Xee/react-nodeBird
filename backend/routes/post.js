const express = require("express");
const { Post, Comment } = require("../database/models");
const User = require("../database/models/User");
const { isLoggedIn } = require("./middleware");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) return res.status(403).send("존재하지 않는 게시글입니다.");
    const comment = Comment.create({
      content: req.body.content,
      PostId: req.params.postId, // postId
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
