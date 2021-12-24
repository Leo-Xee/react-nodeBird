const { DataTypes } = require("sequelize/dist");
const { sequelize } = require(".");

const Post = require("./Post");
const User = require("./User");

const Comment = sequelize.define(
  "Comment",
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

Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = Comment;
