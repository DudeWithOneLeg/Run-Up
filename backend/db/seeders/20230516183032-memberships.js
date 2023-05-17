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
   const validMemberships = [
    {
      userId: 1,
      groupId: 1,
      status: 'one thing'
    },
    {
      userId: 2,
      groupId: 2,
      status: 'one thing'
    },
    {
      userId: 3,
      groupId: 3,
      status: 'one thing'
    }
   ]

   queryInterface.bulkInsert('Memberships', validMemberships)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    let options = {}
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
