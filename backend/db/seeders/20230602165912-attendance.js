'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'Attendances'
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
   const validAttendances = [
    {
      eventId: 1,
      userId: 1,
      status: 'host'
    },
    {
      eventId: 2,
      userId: 2,
      status: 'host'
    },
    {
      eventId: 3,
      userId: 3,
      status: 'host'
    }
   ]

   await queryInterface.bulkInsert(options, validAttendances)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      id: [1, 2, 3]

    })
  }
};
