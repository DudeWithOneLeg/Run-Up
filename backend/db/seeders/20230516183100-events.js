'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'Events'
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
   const validEvents = [
    {
      venueId: 1,
      groupId: 1,
      name: 'Yo',
      description: 'yo',
      type: 'one thing',
      capacity: 9000,
      price: 9000,
      startDate: '2030-11-19',
      endDate: '2030-11-20'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Yo',
      description: 'yo',
      type: 'one thing',
      capacity: 9000,
      price: 9000,
      startDate: '2030-11-19',
      endDate: '2030-11-20'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Yo',
      description: 'yo',
      type: 'one thing',
      capacity: 9000,
      price: 9000,
      startDate: '2030-11-19',
      endDate: '2030-11-20'
    },
   ]

   await queryInterface.bulkInsert(options, validEvents)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const options = {}
    options.tableName = 'Events'
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3]
      }
    })
  }
};
