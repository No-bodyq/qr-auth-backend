module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        username: "adminUser",
        email: "admin@example.com",
        password:
          "$2b$10$yRjI9lOa8u1J8YX7QF7e7Oi5PtLsxVV5J3mYJtwjRzCchQUg9YrGa", // bcrypt hash for "password123"
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "normalUser",
        email: "user@example.com",
        password:
          "$2b$10$yRjI9lOa8u1J8YX7QF7e7Oi5PtLsxVV5J3mYJtwjRzCchQUg9YrGa", // bcrypt hash for "password123"
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
