module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Meals", [
      {
        name: "Breakfast & Lunch",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Breakfast & Supper",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "Lunch & Supper", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "Breakfast, Lunch & Supper",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Meals", null, {});
  },
};
