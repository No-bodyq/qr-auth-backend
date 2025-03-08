module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch user IDs
    const users = await queryInterface.sequelize.query(
      `SELECT id, username FROM "Users";`
    );
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Roles";`
    );

    const userMap = Object.fromEntries(users[0].map((u) => [u.username, u.id]));
    const roleMap = Object.fromEntries(roles[0].map((r) => [r.name, r.id]));

    // Assign roles
    const userRoles = [
      { user: "adminUser", role: "admin" },
      { user: "normalUser", role: "user" },
      { user: "vendorUser", role: "vendor" },
    ]
      .map(({ user, role }) => ({
        userId: userMap[user],
        roleId: roleMap[role],
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
      .filter((ur) => ur.userId && ur.roleId);

    if (userRoles.length > 0) {
      await queryInterface.bulkInsert("UserRoles", userRoles);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("UserRoles", null, {});
  },
};
