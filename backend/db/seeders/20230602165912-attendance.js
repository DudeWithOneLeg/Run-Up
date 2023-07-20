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
      userId: 1,
      status: 'host'
    },
    {
      eventId: 3,
      userId: 1,
      status: 'host'
    },
    {
      eventId: 4,
      userId: 2,
      status: 'host'
    },
    {
      eventId: 5,
      userId: 2,
      status: 'host'
    },
    {
      eventId: 6,
      userId: 2,
      status: 'host'
    },
    {
      eventId: 7,
      userId: 3,
      status: 'host'
    },
    {
      eventId: 8,
      userId: 3,
      status: 'host'
    },
    {
      eventId: 9,
      userId: 3,
      status: 'host'
    },
    {
      eventId: 10,
      userId: 4,
      status: 'host'
    },
    {
      eventId: 11,
      userId: 4,
      status: 'host'
    },
    {
      eventId: 12,
      userId: 4,
      status: 'host'
    },
    {
      eventId: 13,
      userId: 5,
      status: 'host'
    },
    {
      eventId: 14,
      userId: 5,
      status: 'host'
    },
    {
      eventId: 15,
      userId: 5,
      status: 'host'
    },
    {
      eventId: 16,
      userId: 6,
      status: 'host'
    },
    {
      eventId: 17,
      userId: 6,
      status: 'host'
    },
    {
      eventId: 18,
      userId: 6,
      status: 'host'
    },
    {
      eventId: 19,
      userId: 7,
      status: 'host'
    },
    {
      eventId: 20,
      userId: 7,
      status: 'host'
    },
    {
      eventId: 21,
      userId: 7,
      status: 'host'
    },
    {
      eventId: 22,
      userId: 8,
      status: 'host'
    },
    {
      eventId: 23,
      userId: 8,
      status: 'host'
    },
    {
      eventId: 24,
      userId: 8,
      status: 'host'
    },
    {
      eventId: 25,
      userId: 9,
      status: 'host'
    },
    {
      eventId: 26,
      userId: 9,
      status: 'host'
    },
    {
      eventId: 27,
      userId: 9,
      status: 'host'
    },
    {
      eventId: 28,
      userId: 10,
      status: 'host'
    },
    {
      eventId: 29,
      userId: 10,
      status: 'host'
    },
    {
      eventId: 30,
      userId: 10,
      status: 'host'
    },
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
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

    })
  }
};
