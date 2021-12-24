const { sequelize } = require(".");

const Post = require("./Post");

const Hashtag = sequelize.define(
  "Hashtag",
  {
    name: {},
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  },
);

Hashtag.belongsToMany(Post);

module.exports = Hashtag;
