const { DataTypes } = require("sequelize/dist");
const { sequelize } = require(".");

const Comment = require("./Comment");
const Post = require("./Post");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
);

User.hasMany(Post);
User.hasMany(Comment);
User.belongsToMany(Post, { through: "Like", as: "Liked" });
User.belongsToMany(User, { through: "Follow", as: "Followers", foreignKey: "FollowingId" });
User.belongsToMany(User, { through: "Follow", as: "Followings", foreignKey: "FollowerId" });

module.exports = User;
