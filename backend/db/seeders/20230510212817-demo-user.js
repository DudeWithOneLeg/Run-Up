'use strict';

const { query } = require('express');
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const validUsers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'JohnDoe',
        email: 'john@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      }
    ]

   queryInterface.bulkInsert('Users', validUsers)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    let options = {}
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['JohnDoe'] }
    }, {});
  }
};
