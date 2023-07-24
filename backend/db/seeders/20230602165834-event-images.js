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
      url: 'https://static4.depositphotos.com/1010683/285/i/450/depositphotos_2858508-stock-photo-sport-stadium.jpg',
      preview: true
    },
    {
      eventId: 2,
      url: 'https://st.depositphotos.com/2350297/3285/i/450/depositphotos_32853181-stock-photo-track-and-field-park.jpg',
      preview: true
    },
    {
      eventId: 3,
      url: 'https://st2.depositphotos.com/5083063/7580/i/450/depositphotos_75809967-stock-photo-red-race-for-running.jpg',
      preview: true
    },
    {
      eventId: 4,
      url: 'https://st2.depositphotos.com/2389105/5353/i/450/depositphotos_53536963-stock-photo-athletics-track.jpg',
      preview: true
    },
    {
      eventId: 5,
      url: 'https://static4.depositphotos.com/1004999/269/i/450/depositphotos_2693490-stock-photo-beautiful-park.jpg',
      preview: true
    },
    {
      eventId: 6,
      url: 'https://st4.depositphotos.com/10459226/23194/i/450/depositphotos_231948278-stock-photo-summer-park-path-green-trees.jpg',
      preview: true
    },
    {
      eventId: 7,
      url: 'https://st3.depositphotos.com/16149430/19181/i/450/depositphotos_191815784-stock-photo-park.jpg',
      preview: true
    },
    {
      eventId: 8,
      url: 'https://st2.depositphotos.com/1011549/43183/i/450/depositphotos_431834128-stock-photo-beautiful-meadow-footpath-park.jpg',
      preview: true
    },
    {
      eventId: 9,
      url: 'https://st.depositphotos.com/1695227/4813/i/450/depositphotos_48132517-stock-photo-deep-forest-stream-with-crystal.jpg',
      preview: true
    },
    {
      eventId: 10,
      url: 'https://st4.depositphotos.com/10459226/23194/i/450/depositphotos_231948658-stock-photo-summer-park-path-green-trees.jpg',
      preview: true
    },
    {
      eventId: 11,
      url: 'https://www.shutterstock.com/shutterstock/photos/730017625/display_1500/stock-photo-evening-stadium-arena-soccer-field-defocus-background-730017625.jpg',
      preview: true
    },
    {
      eventId: 12,
      url: 'https://www.shutterstock.com/shutterstock/photos/299796638/display_1500/stock-photo-athletics-stadium-with-track-and-grass-field-at-corner-view-sport-theme-render-illustration-299796638.jpg',
      preview: true
    },
    {
      eventId: 13,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 14,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 15,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 16,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 17,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 18,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 19,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 20,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 21,
      url: 'https://www.shutterstock.com/shutterstock/photos/730017625/display_1500/stock-photo-evening-stadium-arena-soccer-field-defocus-background-730017625.jpg',
      preview: true
    },
    {
      eventId: 22,
      url: 'https://www.shutterstock.com/shutterstock/photos/299796638/display_1500/stock-photo-athletics-stadium-with-track-and-grass-field-at-corner-view-sport-theme-render-illustration-299796638.jpg',
      preview: true
    },
    {
      eventId: 23,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 24,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 25,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 26,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 27,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 28,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 29,
      url: 'https://www.shutterstock.com/shutterstock/photos/306123788/display_1500/stock-photo-athlete-track-or-running-track-with-nice-scenic-306123788.jpg',
      preview: true
    },
    {
      eventId: 30,
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
      id:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    })
  }
};
