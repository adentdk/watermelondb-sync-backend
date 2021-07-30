'use strict';

const uuid = require("uuid-v4");
const { REGULAR_ROLE_ID } = require("../../constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      id: uuid(),
      name: 'Aden',
      username: 'adentdk',
      password: '$2b$12$Z4V9h698dAji6Bstj2nap.V510bXEjTihIBAxWbkRk1C.zxOc1imO',
      role_id: REGULAR_ROLE_ID,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
