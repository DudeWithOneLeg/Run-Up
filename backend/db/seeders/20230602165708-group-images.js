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
      url: 'https://media.istockphoto.com/id/1061713622/photo/full-length-of-marathon-runners-having-a-race-through-nature.jpg?s=612x612&w=0&k=20&c=D8Eu5HmcZYAIbDDrePfVCGBXCNoaDoSzmjjA02gKi7E=',
      preview: true
    },
    {
      groupId: 16,
      url: 'https://hips.hearstapps.com/hmg-prod/images/hlh090120feacover-003-1594919987.jpg',
      preview: true
    },
    {
      groupId: 17,
      url: 'https://blackmenrun.com/wp-content/uploads/2022/04/Group-Photo-scaled.jpg',
      preview: true
    },
    {
      groupId: 18,
      url: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/5/7/1367930926942/A-running-group-training--008.jpg?width=465&dpr=1&s=none',
      preview: true
    },
    {
      groupId: 19,
      url: 'https://runkeeper.com/cms/wp-content/uploads/sites/4/2022/12/Running-Group-1024x546.png',
      preview: true
    },
    {
      groupId: 20,
      url: 'https://www.stack.com/wp-content/uploads/2017/10/13090752/Group-Running-654x368.jpg',
      preview: true
    },
    {
      groupId: 21,
      url: 'https://www.podiumrunner.com/wp-content/uploads/2017/06/training-group-1.jpg?width=631&height=421',
      preview: true
    },
    {
      groupId: 22,
      url: 'https://villagerunner.com/wp-content/uploads/2014/06/Village-Runner-sunset-run-13.jpg',
      preview: true
    },
    {
      groupId: 23,
      url: 'https://marathonhandbook.com/wp-content/uploads/Running-Team-Names-2.jpg',
      preview: true
    },
    {
      groupId: 24,
      url: 'https://cms-static.asics.com/system/assets/12760/ld2_1698-1.20190903225855046446.jpg',
      preview: true
    },
    {
      groupId: 25,
      url: 'https://6amcity.brightspotcdn.com/dims4/default/5c94bdb/2147483647/strip/true/crop/1080x608+0+236/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk1-prod-sixam-city.s3.amazonaws.com%2Fbrightspot%2Fec%2Fc5%2F1aa5bfa2c2e8d8f8e813c3dbef19%2F222710284-507429097192863-2181088599597377870-n.jpg',
      preview: true
    },
    {
      groupId: 26,
      url: 'https://cdn.bcm.edu/sites/default/files/styles/full_width_component_image_standard/public/media/images/running-club-20182.jpeg?h=973281bf&itok=S7U1TxdU',
      preview: true
    },
    {
      groupId: 27,
      url: 'https://static.wixstatic.com/media/e274f7_9ca75b37067249e8ad98d431ace044cd~mv2.jpeg/v1/fill/w_560,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/e274f7_9ca75b37067249e8ad98d431ace044cd~mv2.jpeg',
      preview: true
    },
    {
      groupId: 28,
      url: 'https://6amcity.brightspotcdn.com/dims4/default/c3be78f/2147483647/strip/true/crop/1440x811+0+140/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk1-prod-sixam-city.s3.amazonaws.com%2Fbrightspot%2Fe2%2F92%2F881b8a8e4e28862b232c190ff243%2Ffleet-feet-run-club.jpeg',
      preview: true
    },
    {
      groupId: 29,
      url: 'https://runkillarney.com/wp-content/uploads/2019/04/Low-Res-1514-e1556120130763.jpg',
      preview: true
    },
    {
      groupId: 30,
      url: 'https://www.runforall.com/media/3udpgzz1/treadmill-vs-outside.jpg?anchor=center&mode=crop&width=1540&height=900&rnd=133002007381170000',
      preview: true
    },
    {
      groupId: 31,
      url: 'https://i0.wp.com/runnersfirst.co.uk/wp-content/uploads/2020/06/Running-Buddies.jpg?fit=1600%2C1068&ssl=1',
      preview: true
    },
    {
      groupId: 32,
      url: 'https://cms-static.asics.com/system/assets/12760/ld2_1698-1.20190903225855046446.jpg',
      preview: true
    },
    {
      groupId: 33,
      url: 'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Running/Articles/a+Running+Group/group+running+together-carousel.jpg',
      preview: true
    },
    {
      groupId: 34,
      url: 'https://austinrunners.org/wp-content/uploads/2022/11/speedshop.jpg',
      preview: true
    },
    {
      groupId: 35,
      url: 'https://www.statecollege.com/wp-content/uploads/2021/01/1476531_38093.jpg',
      preview: true
    },
    {
      groupId: 36,
      url: 'https://www.dallasrunningclub.com/wp-content/uploads/2020/06/DRCFun5.jpg',
      preview: true
    },
    {
      groupId: 37,
      url: 'https://images.squarespace-cdn.com/content/v1/5dc1a5d44bac502732aac8ca/1591985385760-0W8CNGIO7HMG2YX30N0T/Rogue+Training+tuesday-group+shot.jpg',
      preview: true
    },
    {
      groupId: 38,
      url: 'https://www.brightonhalfmarathon.com/wp-content/uploads/2022/03/BrightonHalf_2022_1996.jpg',
      preview: true
    },
    {
      groupId: 39,
      url: 'https://cdn.outsideonline.com/wp-content/uploads/2022/09/UA-RUNGRL_hero_h.jpg?width=1200',
      preview: true
    },
    {
      groupId: 40,
      url: 'https://static.wixstatic.com/media/1273a9_03498a8ec93d45e89d089e2aa19575f3~mv2.jpg/v1/fill/w_640,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/1273a9_03498a8ec93d45e89d089e2aa19575f3~mv2.jpg',
      preview: true
    },
    {
      groupId: 41,
      url: 'https://www.marathonsports.com/wp-content/uploads/2021/12/BostonRunGroup.jpg',
      preview: true
    },
    {
      groupId: 42,
      url: 'https://images.squarespace-cdn.com/content/v1/5643b494e4b0cca19eae8be8/1682782343823-TV8QN51CSFRD49P3WQ5Z/image-asset.jpeg',
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
    },
    {
      groupId: 71,
      url: 'https://sunriserunco.com/wp-content/uploads/2021/04/4-Different-Types-of-Runners-1200x600.jpg',
      preview: true
    },
    {
      groupId: 72,
      url: 'https://cdn.womensrunning.com/wp-content/uploads/2020/07/JoinRunningGroup.jpg',
      preview: true
    },
    {
      groupId: 73,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 74,
      url: 'https://st2.depositphotos.com/3343629/12151/i/450/depositphotos_121510712-stock-photo-competition-of-five-runners-athletes.jpg',
      preview: true
    },
    {
      groupId: 75,
      url: 'https://static8.depositphotos.com/1002111/990/i/450/depositphotos_9900072-stock-photo-group-of-runners.jpg',
      preview: true
    },
    {
      groupId: 76,
      url: 'https://st3.depositphotos.com/8214686/37541/i/450/depositphotos_375412616-stock-photo-a-group-of-young-people.jpg',
      preview: true
    },
    {
      groupId: 77,
      url: 'https://st4.depositphotos.com/13193658/28215/i/450/depositphotos_282151322-stock-photo-happy-multicultural-retired-men-women.jpg',
      preview: true
    },
    {
      groupId: 78,
      url: 'https://st.depositphotos.com/1518767/4293/i/450/depositphotos_42939389-stock-photo-marathon-athletes-running.jpg',
      preview: true
    },
    {
      groupId: 79,
      url: 'https://st.depositphotos.com/1037987/2755/i/450/depositphotos_27555239-stock-photo-group-of-runners-on-suburban.jpg',
      preview: true
    },
    {
      groupId: 80,
      url: 'https://st.depositphotos.com/1518767/4292/i/450/depositphotos_42925551-stock-photo-marathon-runners-cheering-in-park.jpg',
      preview: true
    },
    {
      groupId: 81,
      url: 'https://st2.depositphotos.com/1518767/10233/i/450/depositphotos_102336062-stock-photo-marathon-athletes-posing.jpg',
      preview: true
    },
    {
      groupId: 82,
      url: 'https://st4.depositphotos.com/2853475/24696/i/450/depositphotos_246962086-stock-photo-multi-ethnic-group-runners-training.jpg',
      preview: true
    },
    {
      groupId: 83,
      url: 'https://st2.depositphotos.com/1037987/10276/i/450/depositphotos_102762872-stock-photo-runners-gesturing-thumbs-up-sign.jpg',
      preview: true
    },
    {
      groupId: 84,
      url: 'https://hips.hearstapps.com/hmg-prod/images/group-of-runners-in-a-cross-country-race-royalty-free-image-1653336803.jpg',
      preview: true
    },
    {
      groupId: 85,
      url: 'https://st2.depositphotos.com/3343629/12151/i/450/depositphotos_121510712-stock-photo-competition-of-five-runners-athletes.jpg',
      preview: true
    },
    {
      groupId: 86,
      url: 'https://hips.hearstapps.com/hmg-prod/images/hlh090120feacover-003-1594919987.jpg',
      preview: true
    },
    {
      groupId: 87,
      url: 'https://blackmenrun.com/wp-content/uploads/2022/04/Group-Photo-scaled.jpg',
      preview: true
    },
    {
      groupId: 88,
      url: 'https://st2.depositphotos.com/3343629/12151/i/450/depositphotos_121510712-stock-photo-competition-of-five-runners-athletes.jpg',
      preview: true
    },
    {
      groupId: 89,
      url: 'https://runkeeper.com/cms/wp-content/uploads/sites/4/2022/12/Running-Group-1024x546.png',
      preview: true
    },
    {
      groupId: 90,
      url: 'https://www.stack.com/wp-content/uploads/2017/10/13090752/Group-Running-654x368.jpg',
      preview: true
    },
    {
      groupId: 91,
      url: 'https://www.podiumrunner.com/wp-content/uploads/2017/06/training-group-1.jpg?width=631&height=421',
      preview: true
    },
    {
      groupId: 92,
      url: 'https://villagerunner.com/wp-content/uploads/2014/06/Village-Runner-sunset-run-13.jpg',
      preview: true
    },
    {
      groupId: 93,
      url: 'https://marathonhandbook.com/wp-content/uploads/Running-Team-Names-2.jpg',
      preview: true
    },
    {
      groupId: 94,
      url: 'https://cms-static.asics.com/system/assets/12760/ld2_1698-1.20190903225855046446.jpg',
      preview: true
    },
    {
      groupId: 95,
      url: 'https://st2.depositphotos.com/3343629/12151/i/450/depositphotos_121510712-stock-photo-competition-of-five-runners-athletes.jpg',
      preview: true
    },
    {
      groupId: 96,
      url: 'https://cdn.bcm.edu/sites/default/files/styles/full_width_component_image_standard/public/media/images/running-club-20182.jpeg?h=973281bf&itok=S7U1TxdU',
      preview: true
    },
    {
      groupId: 97,
      url: 'https://st2.depositphotos.com/3343629/12151/i/450/depositphotos_121510712-stock-photo-competition-of-five-runners-athletes.jpg',
      preview: true
    },
    {
      groupId: 98,
      url: 'https://st2.depositphotos.com/3343629/12151/i/450/depositphotos_121510712-stock-photo-competition-of-five-runners-athletes.jpg',
      preview: true
    },
    {
      groupId: 99,
      url: 'https://runkillarney.com/wp-content/uploads/2019/04/Low-Res-1514-e1556120130763.jpg',
      preview: true
    },
    {
      groupId: 100,
      url: 'https://www.runforall.com/media/3udpgzz1/treadmill-vs-outside.jpg?anchor=center&mode=crop&width=1540&height=900&rnd=133002007381170000',
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
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    })
  }
};
