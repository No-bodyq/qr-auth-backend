module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Permissions", [
      {
        name: "user:create",
        description: "Can create users",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "user:read",
        description: "Can read user information",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "user:update",
        description: "Can update users",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "user:delete",
        description: "Can delete users",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Permissions", null, {});
  },
};
