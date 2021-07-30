'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_access', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      // MAIN COLUMN
      role_id: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: {
          model: 'roles',
          onDelete: 'cascade',
        },
      },
      access_id: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: {
          model: 'accesses',
          onDelete: 'cascade',
        },
      },
      //
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      created_by: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      updated_by: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      deleted_by: {
        allowNull: true,
        type: Sequelize.STRING,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role_access')
  }
};
