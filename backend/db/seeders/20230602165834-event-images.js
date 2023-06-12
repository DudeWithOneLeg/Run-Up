'use strict';
const { Op } = require("sequelize");
const { query } = require('express-validator');

/** @type {import('sequelize-cli').Migration} */
let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'EventImages'
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
   const validEventImages = [
    {
      eventId: 1,
      url: 'url',
      preview: true
    },
    {
      eventId: 2,
      url: 'url',
      preview: true
    },
    {
      eventId: 3,
      url: 'url',
      preview: true
    },
   ]

   await queryInterface.bulkInsert(options, validEventImages, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      id:  [1, 2, 3]
    })
  }
};
