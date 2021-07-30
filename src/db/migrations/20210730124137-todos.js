'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      // MAIN COLUMN
      title: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
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
      // RELATION
      created_by: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: {
          model: 'users',
          onDelete: 'cascade',
        }
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
    await queryInterface.dropTable('todos')
  }
};
