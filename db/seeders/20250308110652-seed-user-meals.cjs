module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("UserMeals", [
      {
        userId: 1, // Assuming user with ID 1 exists
        mealId: 1, // Assuming meal with ID 1 exists
        mealForDate: "breakfast", // Meal type
        dateGenerated: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // Assuming user with ID 2 exists
        mealId: 2, // Assuming meal with ID 2 exists
        mealForDate: "lunch", // Meal type
        dateGenerated: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3, // Assuming user with ID 3 exists
        mealId: 3, // Assuming meal with ID 3 exists
        mealForDate: "dinner", // Meal type
        dateGenerated: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("UserMeals", null, {});
  },
};
