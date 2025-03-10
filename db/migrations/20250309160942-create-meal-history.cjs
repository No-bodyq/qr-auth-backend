module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MealHistory", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      mealId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Meals",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      mealType: {
        type: Sequelize.ENUM("breakfast", "lunch", "supper"),
        allowNull: false,
      },
      dateConsumed: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("MealHistory");
  },
};
