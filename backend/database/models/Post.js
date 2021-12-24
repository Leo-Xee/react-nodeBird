const { DataTypes } = require("sequelize/dist");
const { sequelize } = require(".");

const Comment = require("./Comment");
const Hashtag = require("./Hashtag");
const Image = require("./Image");
const User = require("./User");

const Post = sequelize.define(
  "Post",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  },
);

Post.belongsTo(User);
Post.hasMany(Comment);
Post.hasMany(Image);
Post.belongsToMany(Hashtag);
Post.belongsToMany(User, { through: "Like", as: "Likers" });
Post.belongsTo(Post, { as: "Retweet" });

module.exports = Post;
