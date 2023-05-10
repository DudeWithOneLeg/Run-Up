const express = require('express');
const router = express.Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.post('/test', (req, res) => {
    res.json({
        requestBody: req.body
    })
})

router.get('/set-token-cookie', async (req, res) => {
    const user = await User.findOne({
      where: {
        username: 'JohnDoe'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});

module.exports = router
