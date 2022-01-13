const express = require("express");
const { Op } = require("sequelize");
const { Post, User, Image, Hashtag, Comment } = require("../database/models");

const router = express.Router();

// GET /hashtag/노드
router.get("/:tag", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        },
        { model: User, attributes: ["id", "nickname"] },
        { model: Image },
        {
          model: User,
          through: "Like",
          as: "Likers",
          attributes: ["id"],
        },
        { model: Comment, include: { model: User, attributes: ["id", "nickname"] } },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    console.log("hashtag posts: ", posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
