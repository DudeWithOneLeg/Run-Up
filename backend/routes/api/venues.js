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

const isGroupMember = async(req, res, next) => {
    const member = await Membership.findOne({
        groupId: req.params.groupId,
        userId: req.user.id,
        status: 'co-host'
    })
    if (member) {
        req.isMember = 'true'
    }
    return next()
}

const groupAuthorized = async(req, res, next) => {
    const group = await Group.findByPk(req.params.groupId)
    if (!group) {
        return next()
    }
    if (req.user.id !== group.organizerId) {
        res.status(403)
        req.err = {
            message: "Forbidden"
        }
        return next()
    }
    req.authorized = 'true'
    return next()
}

const venueExists = async (req, res, next) => {
    const venue = await Venue.findOne({
        where: {
            id: req.params.venueId
        },
        attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
    })

    if (!venue) {
        res.status(404)
        req.err = {
            message: "Venue couldn't be found"
        }
        return next()
    }

    req.params.groupId = venue.groupId
    req.venue = venue

    next()
}

router.put('/:venueId',[validateVenue, venueExists, isGroupMember, groupAuthorized, requireAuth], async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    if (!req.isMember && !req.authorized) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    let venue1 = req.venue

    await venue1.set(req.body)

    let venue = await req.venue.save()

    venue = venue.toJSON()

    delete venue.updatedAt

    return res.json(venue)
});

module.exports = router;
