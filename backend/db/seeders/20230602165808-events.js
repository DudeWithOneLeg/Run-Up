'use strict';
const { Op } = require("sequelize");
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
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    }
   ]

   await queryInterface.bulkInsert(options, validEvents, {})
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
