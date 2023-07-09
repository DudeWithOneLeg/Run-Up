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
      url: 'https://www.shutterstock.com/shutterstock/photos/730017625/display_1500/stock-photo-evening-stadium-arena-soccer-field-defocus-background-730017625.jpg',
      preview: true
    },
    {
      eventId: 2,
      url: 'https://www.shutterstock.com/shutterstock/photos/299796638/display_1500/stock-photo-athletics-stadium-with-track-and-grass-field-at-corner-view-sport-theme-render-illustration-299796638.jpg',
      preview: true
    },
    {
      eventId: 3,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
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
