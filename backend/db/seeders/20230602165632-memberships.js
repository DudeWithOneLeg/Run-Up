'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'Memberships'
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
   const validMemberships = [
    {
      userId: 1,
      groupId: 1,
      status: 'co-host'
    },
    {
      userId: 2,
      groupId: 2,
      status: 'pending'
    },
    {
      userId: 3,
      groupId: 3,
      status: 'member'
    }
   ]



   await queryInterface.bulkInsert(options, validMemberships, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    let options = {}
    options.tableName = 'Groups';
    await queryInterface.bulkDelete(options, {
      id: [1, 2, 3]
    }, {})
  }
};
