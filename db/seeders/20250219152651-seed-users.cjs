module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentYear = new Date().getFullYear().toString().slice(-2);

    function generateMatricNumber() {
      const randomFourDigits = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
      return `${currentYear}/${randomFourDigits}`;
    }

    await queryInterface.bulkInsert("Users", [
      {
        username: "adminUser",
        email: "admin@example.com",
        matricNumber: generateMatricNumber(),
        mealId: 1,
        password:
          "$2b$10$s6JGKhZj9oX1gtRdboaT6uPtgix48P8zHnKCertn91Se2WkDxftfC", // bcrypt hash for "password123"
        roleId: 1, // Admin role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "normalUser",
        email: "user@example.com",
        matricNumber: generateMatricNumber(),
        mealId: 3,
        password:
          "$2b$10$s6JGKhZj9oX1gtRdboaT6uPtgix48P8zHnKCertn91Se2WkDxftfC", // bcrypt hash for "password123"
        roleId: 2, // User role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "vendorUser",
        email: "vendor@example.com",
        matricNumber: generateMatricNumber(),
        mealId: 3,
        password:
          "$2b$10$s6JGKhZj9oX1gtRdboaT6uPtgix48P8zHnKCertn91Se2WkDxftfC", // bcrypt hash for "password123"
        roleId: 3, // Vendor role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
