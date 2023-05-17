'use strict';

const { query } = require('express-validator');

/** @type {import('sequelize-cli').Migration} */
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
   queryInterface.bulkInsert('EventImages', validEventImages)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const options = {}
    options.tableName = 'EventImages'
    const Op = Sequelize.Op
    queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3]
      }
    })
  }
};
