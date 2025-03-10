module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("MealHistory", [
      {
        userId: 1,
        mealId: 1, // Fixed meal ID for all entries
        mealType: "breakfast", // Added mealType
        dateConsumed: new Date("2024-03-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        mealId: 1, // Same meal ID
        mealType: "lunch", // Added mealType
        dateConsumed: new Date("2024-03-02"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        mealId: 1, // Same meal ID
        mealType: "supper", // Added mealType
        dateConsumed: new Date("2024-03-03"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("MealHistory", { userId: 1 }, {});
  },
};
