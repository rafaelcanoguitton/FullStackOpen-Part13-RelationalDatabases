const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "date", {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        isGreaterThan1991(value) {
          if (value < 1991) {
            throw new Error("Date must be greater than 1991");
          }
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "date");
  },
};
