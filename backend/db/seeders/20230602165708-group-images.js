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
      url: 'https://st2.depositphotos.com/3343629/12151/i/450/depositphotos_121510712-stock-photo-competition-of-five-runners-athletes.jpg',
      preview: true
    },
    {
      groupId: 5,
      url: 'https://static8.depositphotos.com/1002111/990/i/450/depositphotos_9900072-stock-photo-group-of-runners.jpg',
      preview: true
    },
    {
      groupId: 6,
      url: 'https://st3.depositphotos.com/8214686/37541/i/450/depositphotos_375412616-stock-photo-a-group-of-young-people.jpg',
      preview: true
    },
    {
      groupId: 7,
      url: 'https://st4.depositphotos.com/13193658/28215/i/450/depositphotos_282151322-stock-photo-happy-multicultural-retired-men-women.jpg',
      preview: true
    },
    {
      groupId: 8,
      url: 'https://st.depositphotos.com/1518767/4293/i/450/depositphotos_42939389-stock-photo-marathon-athletes-running.jpg',
      preview: true
    },
    {
      groupId: 9,
      url: 'https://st.depositphotos.com/1037987/2755/i/450/depositphotos_27555239-stock-photo-group-of-runners-on-suburban.jpg',
      preview: true
    },
    {
      groupId: 10,
      url: 'https://st.depositphotos.com/1518767/4292/i/450/depositphotos_42925551-stock-photo-marathon-runners-cheering-in-park.jpg',
      preview: true
    },
    {
      groupId: 11,
      url: 'https://st2.depositphotos.com/1518767/10233/i/450/depositphotos_102336062-stock-photo-marathon-athletes-posing.jpg',
      preview: true
    },
    {
      groupId: 12,
      url: 'https://st4.depositphotos.com/2853475/24696/i/450/depositphotos_246962086-stock-photo-multi-ethnic-group-runners-training.jpg',
      preview: true
    },
    {
      groupId: 13,
      url: 'https://st2.depositphotos.com/1037987/10276/i/450/depositphotos_102762872-stock-photo-runners-gesturing-thumbs-up-sign.jpg',
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
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
    })
  }
};
