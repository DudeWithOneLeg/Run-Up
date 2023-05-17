'use strict';

const { query } = require('express');
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'Users'

module.exports = {
  async up(queryInterface, Sequelize) {
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
        firstName: 'John1',
        lastName: 'Doe1',
        username: 'JohnDoe1',
        email: 'john1@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John2',
        lastName: 'Doe2',
        username: 'JohnDoe2',
        email: 'john2@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John3',
        lastName: 'Doe3',
        username: 'JohnDoe3',
        email: 'john3@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      }
    ]

    queryInterface.bulkInsert(options, validUsers)
  },

  async down(queryInterface, Sequelize) {
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
      username: { [Op.in]: ['JohnDoe1', 'JohnDoe2', 'JohnDoe3'] }
    }, {});
  }
};
