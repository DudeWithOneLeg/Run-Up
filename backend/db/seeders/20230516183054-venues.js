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
   const validVenues = [
    {
      groupId: 1,
      address: 'yo',
      city: 'H-Town',
      state: 'Tx',
      lat: 30.2,
      lng: 30.2
    },
   ]
   queryInterface.bulkInsert('Venues', validVenues)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const options = {}
    options.tableName = 'Venues'
    const Op = Sequelize.Op
    queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3]
      }
    })
  }
};
