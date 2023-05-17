'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'Groups'

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
   const validGroup = [
    {
      organizerId: 1,
      name: 'somename',
      about: 'some text',
      type: 'one thing',
      private: false,
      city: 'H-town',
      state: 'Tx'
    },
    {
      organizerId: 2,
      name: 'somename',
      about: 'some text',
      type: 'one thing',
      private: false,
      city: 'H-town',
      state: 'Tx'
    },
    {
      organizerId: 3,
      name: 'somename',
      about: 'some text',
      type: 'one thing',
      private: false,
      city: 'H-town',
      state: 'Tx'
    },
   ]
   
   queryInterface.bulkInsert(options, validGroup)
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
      organizerId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
