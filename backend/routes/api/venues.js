const express = require('express');
const router = express.Router();
const { User, Group, GroupImage, Membership, Venue } = require('../../db/models')
const { restoreUser, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const validateVenue = [
    check('address')
        .exists({ checkFalsey: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsey: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsey: true })
        .withMessage('State is required'),
    check('lat')
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .isDecimal()
        .withMessage('Longitude is not valid'),
    handleValidationErrors
];

const groupExists = async (req, res, next) => {
    const group = await Group.findByPk(req.params.groupId, {
        raw: true
    })
    if (!group) {
        res.status(404)
        req.err = {
            message: "Venue couldn't be found"
        }
        return next()
    }
    else if (req.user.id !== group.organizerId) {
        res.status(403)
        req.err = {
            message: "Forbidden"
        }
        return next()
    }
    req.group = group
    next()
}

const venueExists = async (req, res, next) => {
    const venue = await Venue.findByPk(req.params.venueId, {
        include: [{model: Group,
            include: [{model: Membership,
            where: {
                id: req.user.id
            }}]
        }],
        raw: true
    })


    if (!venue) {
        res.status(404)
        req.err = {
            message: "Venue couldn't be found"
        }
        return next()
    }
    else if (req.user.id !== venue['Group.Memberships.id']) {
        res.status(403)
        req.err = {
            message: "Forbidden"
        }
        return next()
    }
    req.venue = venue
    next()
}

router.put('/:venueId',[validateVenue, venueExists, requireAuth], async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }
    if (req.venue['Group.Memberships.status'] !== 'co-host') {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }
    req.body.groupId = req['Group.id']
    const venue = await Venue.save(req.body)
    res.json(venue)
});

module.exports = router;
