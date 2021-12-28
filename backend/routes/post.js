const express = require("express");
const { Post } = require("../database/models");
const { isLoggedIn } = require("./middleware");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
    const post = await Post.create({
      content: req.body.content,
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
