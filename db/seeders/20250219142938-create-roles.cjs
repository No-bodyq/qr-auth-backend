module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "admin",
        description: "Administrator with full access",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "user",
        description: "Regular user with meal access",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "vendor",
        description: "Vendor responsible for managing meals",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
