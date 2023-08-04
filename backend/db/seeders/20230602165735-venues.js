'use strict';
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
let options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // define your schema in options object
    }
    options.tableName = 'Venues'
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
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 1,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 1,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 1,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 1,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 1,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 1,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 1,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 1,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 1,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    },
    {
      groupId: 2,
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 2,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 2,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 2,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 2,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 2,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 2,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 2,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 2,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 2,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    },
    {
      groupId: 3,
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 3,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 3,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 3,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 3,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 3,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 3,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 3,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 3,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 3,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    },
    {
      groupId: 4,
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 4,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 4,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 4,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 4,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 4,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 4,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 4,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 4,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 4,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    },
    {
      groupId: 5,
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 5,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 5,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 5,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 5,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 5,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 5,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 5,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 5,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 5,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    },
    {
      groupId: 6,
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 6,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 6,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 6,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 6,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 6,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 6,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 6,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 6,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 6,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    },
    {
      groupId: 7,
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 7,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 7,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 7,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 7,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 7,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 7,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 7,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 7,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 7,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    },
    {
      groupId: 8,
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 8,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 8,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 8,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 8,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 8,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 8,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 8,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 8,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 8,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    },
    {
      groupId: 9,
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 9,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 9,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 9,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 9,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 9,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 9,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 9,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 9,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 9,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    },
    {
      groupId: 10,
      address: "SE C St, Bentonville, AR 72712",
      city: "Bentonville",
      state: "Arkansas",
      lat: 36.35395,
      lng: -94.2057526
    },
    {
      groupId: 10,
      address: "Lawrence, KS 66049",
      city: "Lawrence",
      state: "Kansas",
      lat: 38.9808897,
      lng: -95.33105239999999
    },
    {
      groupId: 10,
      address: "913 N Hester St, Stillwater, OK 74075",
      city: "Stillwater",
      state: "Oklahoma",
      lat: 36.131825,
      lng: -97.0660036
    },
    {
      groupId: 10,
      address: "36PP+6C, Fort Riley, KS 66442",
      city: "Fort Riley",
      state: "Kansas",
      lat: 39.085551099999996,
      lng: -96.7639447
    },
    {
      groupId: 10,
      address: "223 E Pierce Ave, Arkansas City, KS 67005",
      city: "Arkansas City",
      state: "Kansas",
      lat: 37.0433398,
      lng: -97.03628669999999
    },
    {
      groupId: 10,
      address: "Creehan Ln, Adrian, MI 49221",
      city: "Adrian",
      state: "Michigan",
      lat: 41.9004318,
      lng: -84.06757499999999
    },
    {
      groupId: 10,
      address: "2935 W 24th Ave, Emporia, KS 66801",
      city: "Emporia",
      state: "Kansas",
      lat: 38.4251022,
      lng: -96.2214508
    },
    {
      groupId: 10,
      address: "13600 W 135th St, Olathe, KS 66062",
      city: "Olathe",
      state: "Kansas",
      lat: 38.8856211,
      lng: -94.7431859
    },
    {
      groupId: 10,
      address: "Wichita, KS 67205",
      city: "Wichita",
      state: "Kansas",
      lat: 37.7472546,
      lng: -97.4473914
    },
    {
      groupId: 10,
      address: "Hattiesburg, MS 39401",
      city: "Hattiesburg",
      state: "Mississippi",
      lat: 31.333119,
      lng: -89.322637
    }
   ]

   await queryInterface.bulkInsert(options, validVenues, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Venues'
    await queryInterface.bulkDelete(options, {
      id: [1, 2, 3]
    })
  }
};
