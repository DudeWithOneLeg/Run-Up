const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check, cookie } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({checkFalsey: true})
        .withMessage('First Name is required'),
    check('lastName')
        .exists({checkFalsey: true})
        .withMessage('last Name is required'),
    handleValidationErrors
];

router.post(
    '/', validateSignup,
    async (req, res) => {
        const { firstName, lastName, email, password, username } = req.body;
        const hashedPassword = bcrypt.hashSync(password);

        const emailExists = await User.findOne({
            where: {
                email
            }
        })
        const usernameExists = await User.findOne({
            where: {
                username
            }
        })

        if (emailExists) {
            res.status(500)
            return res.json({
                "message": "User already exists",
                "errors": {
                  "email": "User with that email already exists"
                }
              })
        }
        if (usernameExists) {
            res.status(500)
            return res.json({
                "message": "User already exists",
                "errors": {
                  "username": "User with that username already exists"
                }
              })
        }

        const user = await User.create({ firstName, lastName, email, username, hashedPassword });


        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        };

        setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

module.exports = router;
