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
      name: 'Lunar Lunacy Relay',
      description: 'Join Moonwalkers United in this hilarious relay race where teams of moonwalking enthusiasts pass the "lunar baton" from one smooth criminal to another under the shining moonlight. Get ready to strut your stuff and leave your competitors starstruck!',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Alien Invasion Fun Run',
      description: 'Attention all moonwalkers! The extraterrestrial beings have landed, and they want to see your moonwalking skills. Dress up as aliens, space travelers, or your favorite MJ character, and show off your gravity-defying moves while racing through a stellar course.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Moonbounce Marathon',
      description: "Bounce your way to the moon and back in this bouncy marathon event. Moonwalkers United is bringing you trampolines, space hoppers, and inflatable moon boots for a race that's out of this world. It's time to defy gravity and have a laugh-filled marathon experience!",
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Galactic Grooves 5K',
      description: "Get ready for an interstellar dance-off! At the Galactic Grooves 5K, moonwalkers will race while busting out their best dance moves to the beat of Michael Jackson's greatest hits. Spectators will be entertained as runners showcase their unique styles and moonwalking finesse.",
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Moonstruck Scavenger Hunt',
      description: 'Moonwalkers, gear up for a cosmic scavenger hunt! Solve riddles, follow clues, and moonwalk your way through the city, gathering MJ-themed items along the way. The team that collects the most items before reaching the final destination will be crowned the ultimate moonstruck champions.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-07-11T22:34',
      endDate: '2023-07-16T22:34'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Smooth Criminal Obstacle Course',
      description: "Are you smooth enough to outwit the obstacles? Test your agility and moonwalking skills as you navigate through a zany obstacle course inspired by Michael Jackson's 'Smooth Criminal' music video. Avoid those 'criminal' hurdles and dance your way to victory!",
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Thriller Night Glow Run',
      description: "It's a thriller, thrill night! Moonwalkers United invites you to a spooky glow run where neon lights, eerie sounds, and dance zombies will accompany you on this hair-raising adventure. Dress up as your favorite MJ monster and bring your moonwalking A-game!",
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Moonwalkers Got Talent Show',
      description: "Step into the spotlight and showcase your out-of-this-world talents in front of the Moonwalkers United audience. Sing, dance, moonwalk, or perform any talent that honors the King of Pop! The most entertaining act will be crowned the official 'Moonwalkers' Got Talent' star.",
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 1,
      groupId: 1,
      name: 'Billie Jean Light-Up Night Run',
      description: "It's Billie Jean's night! Dress up in your brightest and shiniest attire as we light up the night on this electrifying run. Glow sticks, neon accessories, and luminescent outfits are a must for this fun-filled evening event hosted by Moonwalkers United!",
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
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
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 2,
      groupId: 2,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'In person',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
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
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
    },
    {
      venueId: 3,
      groupId: 3,
      name: 'Event Name',
      description: '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      type: 'Online',
      capacity: 9000,
      price: 9000,
      startDate: '2023-09-20T04:16',
      endDate: '2023-09-21T04:16'
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
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    })
  }
};
