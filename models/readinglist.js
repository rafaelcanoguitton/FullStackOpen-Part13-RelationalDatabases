const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primary: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "reading_list",
    underscored: true,
  }
);

module.exports = ReadingList;
