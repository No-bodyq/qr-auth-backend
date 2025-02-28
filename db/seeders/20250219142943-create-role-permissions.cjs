module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Roles";`
    );
    const permissions = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Permissions";`
    );

    const roleMap = Object.fromEntries(
      roles[0].map((role) => [role.name, role.id])
    );
    const permissionMap = Object.fromEntries(
      permissions[0].map((permission) => [permission.name, permission.id])
    );

    const rolePermissions = [
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["user:create"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["user:read"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["user:update"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["user:delete"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["user"],
        permissionId: permissionMap["user:read"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("RolePermissions", rolePermissions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("RolePermissions", null, {});
  },
};
