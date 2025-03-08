module.exports = {
  up: async (queryInterface) => {
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
      // Admin gets all permissions
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
        roleId: roleMap["admin"],
        permissionId: permissionMap["meal:create"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["meal:read"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["meal:update"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["meal:delete"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["role:assign"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["permission:assign"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Vendor can manage meals
      {
        roleId: roleMap["vendor"],
        permissionId: permissionMap["meal:create"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["vendor"],
        permissionId: permissionMap["meal:read"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["vendor"],
        permissionId: permissionMap["meal:update"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["vendor"],
        permissionId: permissionMap["meal:delete"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // User can only read meal plans
      {
        roleId: roleMap["user"],
        permissionId: permissionMap["user:read"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["user"],
        permissionId: permissionMap["meal:read"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("RolePermissions", rolePermissions);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("RolePermissions", null, {});
  },
};
