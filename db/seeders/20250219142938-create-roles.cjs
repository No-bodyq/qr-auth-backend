module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "admin",
        description: "Administrator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "user",
        description: "Regular User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
