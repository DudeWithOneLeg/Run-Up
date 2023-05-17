'use strict';

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
   const validAttendances = [
    {
      eventId: 1,
      userId: 1,
      status: 'one thing'
    },
    {
      eventId: 2,
      userId: 2,
      status: 'one thing'
    },
    {
      eventId: 3,
      userId: 3,
      status: 'one thing'
    }
   ]
   let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'Attendances'
   queryInterface.bulkInsert(options, validAttendances)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const options = {}
    options.tableName = 'Attendances'
    const Op = Sequelize.Op
    queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3]
      }
    })
  }
};
