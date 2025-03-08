module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert("Permissions", [
      // User Permissions
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

      // Meal Management Permissions
      {
        name: "meal:create",
        description: "Can create meals",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "meal:read",
        description: "Can view meals",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "meal:update",
        description: "Can update meals",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "meal:delete",
        description: "Can delete meals",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Role & Permission Management
      {
        name: "role:assign",
        description: "Can assign roles to users",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "permission:assign",
        description: "Can assign permissions to roles",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Permissions", null, {});
  },
};
