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
      url: 'https://sunriserunco.com/wp-content/uploads/2021/04/4-Different-Types-of-Runners-1200x600.jpg',
      preview: true
    },
    {
      groupId: 2,
      url: 'https://cdn.womensrunning.com/wp-content/uploads/2020/07/JoinRunningGroup.jpg',
      preview: true
    },
    {
      groupId: 3,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
   ]

   await queryInterface.bulkInsert(options , validGroupImages, {})
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
