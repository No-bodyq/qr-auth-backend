module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MealDetails", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      mealId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Meals", // Ensure "Meals" table exists
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      breakfast: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lunch: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      supper: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("MealDetails");
  },
};
