module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("UserMeals", [
      {
        userId: 1, // Assuming user with ID 1 exists
        mealId: 1, // Assuming meal with ID 1 exists
        mealsLeft: 10, // Example value
        mealsUsed: 2, // Example value
        daysLeft: 5, // Example value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // Assuming user with ID 2 exists
        mealId: 2, // Assuming meal with ID 2 exists
        mealsLeft: 15, // Example value
        mealsUsed: 5, // Example value
        daysLeft: 7, // Example value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3, // Assuming user with ID 3 exists
        mealId: 3, // Assuming meal with ID 3 exists
        mealsLeft: 8, // Example value
        mealsUsed: 3, // Example value
        daysLeft: 4, // Example value
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("UserMeals", null, {});
  },
};
