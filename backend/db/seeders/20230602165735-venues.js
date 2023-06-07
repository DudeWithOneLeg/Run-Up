'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'Venues'
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
   const validVenues = [
    {
      groupId: 1,
      address: 'yo',
      city: 'H-Town',
      state: 'Tx',
      lat: 30.2,
      lng: 30.2
    },
   ]

   await queryInterface.bulkInsert(options, validVenues, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const options = {}
    options.tableName = 'Venues'
    await queryInterface.bulkDelete(options, {
      id: [1, 2, 3]
    })
  }
};
