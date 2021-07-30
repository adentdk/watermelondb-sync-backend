'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accesses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      // MAIN COLUMN
      name: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING
      },
      icon: {
        allowNull: true,
        type: Sequelize.STRING(32)
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('mobile', 'web', 'api')
      },
      details: {
        allowNull: true,
        type: Sequelize.STRING
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      // RELATION
      parent_id: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('accesses')
  }
};
