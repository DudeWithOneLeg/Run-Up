const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupRouter = require('./groups.js');
const venueRouter = require('./venues.js');
const eventRouter = require('./events.js');
const groupImageRouter = require('./group-images.js');
const eventImageRouter = require('./event-images.js')

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/groups', groupRouter);

router.use('/venues', venueRouter);

router.use('/events', eventRouter);

router.use('/group-images', groupImageRouter);

router.use('/event-images', eventImageRouter)

// test-user-auth
// router.post('/test', (req, res) => {
//     res.json({
//         requestBody: req.body
//     })
// })

// router.get('/set-token-cookie', async (req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: 'JohnDoe'
//       }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user: user });
// });

// router.get('/restore-user', (req, res) => {
//     return res.json(req.user)
// })

// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user)
// })

module.exports = router
