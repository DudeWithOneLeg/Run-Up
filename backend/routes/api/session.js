const express = require('express')
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models')
// const cookieParser = require('cookie-parser');
// router.use(cookieParser)

const validateLogin = [
    check('email')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email is required'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
    handleValidationErrors
  ];

// router.use(setTokenCookie)

 //router.use(restoreUser)

router.get(
    '/', requireAuth,
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: req.cookies.token
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
);

router.post(
    '/', validateLogin,
    async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.unscoped().findOne({
            where: {
                [Op.or]: {
                    email: email
                }
            }
        });

        if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = { message: 'Invalid credentials' };
            return next(err);
        }

        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

router.delete('/', (req, res) => {
    res.clearCookie('token');
    return res.json({
        message: "Success"
    })
})



module.exports = router;