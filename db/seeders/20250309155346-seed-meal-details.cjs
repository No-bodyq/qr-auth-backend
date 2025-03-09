module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("MealDetails", [
      {
        mealId: 1, // Breakfast & Lunch
        breakfast: true,
        lunch: true,
        supper: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 2, // Breakfast & Supper
        breakfast: true,
        lunch: false,
        supper: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 3, // Lunch & Supper
        breakfast: false,
        lunch: true,
        supper: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mealId: 4, // Breakfast, Lunch & Supper
        breakfast: true,
        lunch: true,
        supper: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("MealDetails", null, {});
  },
};
