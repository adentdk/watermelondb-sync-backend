'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todo_items', {
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
      is_done: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      // RELATION
      todo_id: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: {
          model: 'todos',
          onDelete: 'cascade',
        }
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
    await queryInterface.dropTable('todo_items')
  }
};
