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
    {
      groupId: 4,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 5,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 6,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 7,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 8,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 9,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 10,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 11,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 12,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 13,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 14,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 15,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 16,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 17,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 18,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 19,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 20,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 21,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 22,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 23,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 24,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 25,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 26,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 27,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 28,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 29,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 30,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 31,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 32,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 33,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 34,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 35,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 36,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 37,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 38,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 39,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 40,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 41,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 42,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 43,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 44,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 45,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 46,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 47,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 48,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 49,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 50,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 51,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 52,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 53,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 54,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 55,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 56,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 57,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 58,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 59,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 60,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 61,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 62,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 63,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 64,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 65,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 66,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 67,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 68,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 69,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 70,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    }
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
