'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'GroupImages'
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
   const validGroupImages = [
    {
      groupId: 1,
      url: 'something',
      preview: true
    },
    {
      groupId: 2,
      url: 'something',
      preview: true
    },
    {
      groupId: 3,
      url: 'something',
      preview: true
    },
   ]

   await queryInterface.bulkInsert(options , validGroupImages)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const options = {}
    options.tableName = 'GroupImages'
    await queryInterface.bulkDelete(options, {
      id: [1, 2, 3]
    })
  }
};