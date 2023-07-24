'use strict';

const bcrypt = require('bcryptjs');

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
        firstName: 'Michael',
        lastName: 'Jackson',
        username: 'SmoothCriminal',
        email: 'smooth@criminal.com',
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
      },
      {
        firstName: 'John4',
        lastName: 'Doe4',
        username: 'JohnDoe4',
        email: 'john4@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John5',
        lastName: 'Doe5',
        username: 'JohnDoe5',
        email: 'john5@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John6',
        lastName: 'Doe6',
        username: 'JohnDoe6',
        email: 'john6@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John7',
        lastName: 'Doe7',
        username: 'JohnDoe7',
        email: 'john7@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John8',
        lastName: 'Doe8',
        username: 'JohnDoe8',
        email: 'john8@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John9',
        lastName: 'Doe9',
        username: 'JohnDoe9',
        email: 'john9@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John10',
        lastName: 'Doe10',
        username: 'JohnDoe10',
        email: 'john10@doe.com',
        hashedPassword: bcrypt.hashSync('password')
      }
    ]

    await queryInterface.bulkInsert(options, validUsers, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, {});
  }
};
