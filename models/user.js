const { sequelize } = require("../util/db");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGERM,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "users",
  }
);

module.exports = User;
