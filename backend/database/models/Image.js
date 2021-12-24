const { DataTypes } = require("sequelize/dist");
const { sequelize } = require(".");

const Post = require("./Post");

const Image = sequelize.define(
  "Image",
  {
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
);

Image.belongsTo(Post);

module.exports = Image;
