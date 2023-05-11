const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use(restoreUser)

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
