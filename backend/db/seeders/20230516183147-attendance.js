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
   queryInterface.bulkInsert('Attendances', validAttendances)
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
