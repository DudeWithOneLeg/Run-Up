const express = require('express')
const router = express.Router()
const { User, Group, GroupImage, Membership, Venue, Event, Attendance, EventImage, sequelize } = require('../../db/models')
const { restoreUser, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')

const validateGroup = [
    check('name')
        .isLength({ max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .isIn(['Online', 'In person']),
    check('private')
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsey: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsey: true })
        .withMessage('State is required'),
    handleValidationErrors
]

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
]

const isGroupMember = async (req, res, next) => {
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

const venueExists = async (req, res, next) => {
    if (!req.body.venueId) {
        req.body.venueId = null
        req.params.venueId2 = 'true'
        return next()
    }
    const venue = await Venue.findOne({
        where: {
            id: req.body.venueId
        }
    })
    console.log(venue)
    if (!venue) {
        req.params.venueId2 = 'false'
        return next()
    }
    req.params.venueId2 = 'true'
    return next()
}

const eventDateBool = (req, res, next) => {
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)

    if (endDate > startDate) {
        req.params.endDateBool = 'true'
    }
    next()
}

const validateEvent = [
    check('venueId2')
        .contains('true')
        .withMessage('Venue does not exist'),
    check('name')
        .isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters'),
    check('type')
        .isIn(['Online', 'In person'])
        .withMessage('Type must be Online or In person'),
    check('capacity')
        .isInt()
        .withMessage('Capacity must be an integer'),
    check('price')
        .isFloat({ min: 0 })
        .withMessage('Price is invalid'),
    check('description')
        .exists({ checkFalsey: true })
        .withMessage('Description is required'),
    check('startDate')
        .isAfter()
        .withMessage('Start date must be in the future'),
    check('endDateBool')
        .contains('true')
        .withMessage('End date is less than start date'),
    handleValidationErrors
]

router.use(restoreUser)

const groupExists = async (req, res, next) => {
    const group = await Group.findByPk(req.params.groupId, {
        raw: true
    })
    if (!group) {
        res.status(404)
        req.err = {
            message: "Group couldn't be found"
        }
        return next()
    }
    req.group = group
    next()
}

const groupAuthorized = (req, res, next) => {
    if (!req.group) {
        return next()
    }
    if (req.user.id !== req.group.organizerId) {
        res.status(403)
        req.err = {
            message: "Forbidden"
        }
        return next()
    }

    req.authorized = 'true'
    return next()
}

router.get('/', async (req, res) => {

    let groups = await Group.findAll({
        raw: true
    })

    let numMembs = 0;
    let previewImage = ''

    for (element of groups) {
        numMembs = await Membership.count({
            where: {
                groupId: element.id
            }
        })

        const numEvents = await Event.count({
            where: {
                groupId: element.id
            }
        })

        element.numEvents = numEvents

        previewImage = await GroupImage.findOne({
            where: {
                groupId: element.id,
                preview: true
            },
            raw: true
        })

        element.numMembers = numMembs
        if (previewImage) {
            if (previewImage.url) {
                element.previewImage = previewImage.url
            }
        }

    }

    return res.json({
        Groups: [...groups]
    })
})

router.post('/', [validateGroup, requireAuth], async (req, res) => {
    req.body.organizerId = req.user.id
    const newGroup = await Group.create(req.body)
    return res.json(newGroup)
})

router.get('/current', requireAuth, async (req, res) => {
    const myGroup = await Group.findAll({
        where: {
            organizerId: req.user.id
        },
        raw: true
    })

    let groups = await Membership.findOne({
        where: {
            userId: req.user.id,
            status: 'member'
        },
        include: Group
    })
    if (groups) {
        groups = groups.Groups

        myGroup.concat(groups)
    }



    for (let group of myGroup) {
        const numMems = await Membership.count({
            where: {
                groupId: group.id
            }
        })

        group.numMembers = numMems
        const previewImg = await GroupImage.findOne({
            where: {
                groupId: group.id,
                preview: true
            }
        })
        if (!previewImg) {
            group.previewImage = null
        } else {
            group.previewImage = previewImg.url
        }

    }

    res.json({
        Groups: myGroup
    })
})

router.get('/:groupId', groupExists, async (req, res) => {
    console.log("=============================", req.params.groupId)
    if (req.err) {
        return res.json(req.err)
    }
    let groups = await Group.findOne({
        include: [
            {
                model: GroupImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'groupId']
                }
            },
            {
                model: Venue,
                attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
            }
        ],
        where: {
            id: req.params.groupId
        }
    })

    if (!groups) {
        res.status(404)
        return res.json({
            message: "Group couldn't be found"
        })
    }

    groups = groups.toJSON()

    const numMembers = await Membership.count({
        where: {
            groupId: req.params.groupId
        }
    })
    groups.numMmbers = numMembers




    const organizer = await User.findByPk(groups.organizerId, {
        attributes: ['id', 'firstName', 'lastName'],
        raw: true
    })

    groups.Organizer = organizer
    return res.json(groups)
})

router.post('/:groupId/images', [groupExists, groupAuthorized, requireAuth], async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }
    req.body.groupId = req.params.groupId
    let img = await GroupImage.create(req.body)

    img = img.toJSON()

    delete img.groupId
    delete img.createdAt
    delete img.updatedAt

    console.log(img)
    return res.json(img)
})

router.put('/:groupId', [validateGroup, groupExists, groupAuthorized, requireAuth], async (req, res, next) => {
    if (req.err) {
        return res.json(req.err)
    }
    const group = await Group.findByPk(req.params.groupId)
    for (field of Object.keys(req.body)) {
        group[field] = req.body[field]
    }
    await group.save()

    return res.json(group)

})

router.delete('/:groupId', [groupExists, groupAuthorized, requireAuth], async (req, res) => {
    if (req.err) {
        res.json(req.err)
    }
    const group = await Group.findByPk(req.params.groupId)
    await group.destroy()
    res.json({
        message: "Successfully deleted"
    })
})

router.get('/:groupId/venues', [groupExists, groupAuthorized, isGroupMember, requireAuth], async (req, res) => {
    if (req.err) {
        res.json(req.err)
    }
    if (!req.isMember && !req.authorized) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }
    const venues = await Venue.findAll({
        where: {
            groupId: req.group.id
        },
        attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
    })
    return res.json({
        Venues: venues
    })

})

router.post('/:groupId/venues', [validateVenue, groupExists, groupAuthorized, isGroupMember, requireAuth], async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    if (!req.authorized && !req.isMember) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    req.body.groupId = req.group.id

    let venue = await Venue.create(req.body)

    venue = venue.toJSON()

    delete venue.createdAt
    delete venue.updatedAt

    res.json(venue)
})

router.get('/:groupId/events', groupExists, async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    const events = await Event.findAll({
        where: {
            groupId: req.params.groupId
        },
        include: [{
            model: Group,
            attributes: ['id', 'name', 'city', 'state']
        }, {
            model: Venue,
            attributes: ['id', 'city', 'state']
        }],
        attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'description', 'startDate', 'endDate'],
        order: [['startDate', 'ASC']]
    })

    if (!events[0]) {
        res.status(404)
        return res.json({
            message: "There are no events for this group"
        })
    }


    for (let event of events) {
        const index = events.indexOf(event)
        event = event.toJSON()

        const numAttending = await Attendance.count({
            where: {
                eventId: event.id,
                status: 'attending'
            }
        })

        const preview = await EventImage.findOne({
            where: {
                eventId: event.id,
                preview: true
            },
            attributes: ['url'],
            raw: true
        })
        console.log(preview)

        if (preview) {
            event.previewImage = preview.url
        }
        else {
            event.previewImage = null
        }

        event.numAttending = numAttending
        events[index] = event
    }
    console.log(events)

    res.json(events)
})

router.post('/:groupId/events', [venueExists, eventDateBool, validateEvent, groupExists, groupAuthorized, isGroupMember, requireAuth], async (req, res, next) => {
    if (req.err) {
        return res.json(req.err)
    }

    req.body.groupId = req.params.groupId

    console.log(req.body)

    let event = await Event.create(req.body)

    event = event.toJSON()

    const host = await Attendance.create({
        eventId: event.id,
        userId: req.user.id,
        status: 'host'
    })

    delete event.createdAt
    delete event.updatedAt

    console.log()


    return res.json(event)
})

router.get('/:groupId/members', [groupExists], async (req, res) => {

    if (req.err) {
        return res.json(req.err)
    }

    let auth;

    if (req.user) {
        auth = await Membership.findOne({
            where: {
                userId: req.user.id,
                groupId: req.params.groupId,
                status: {
                    [Op.or]: ['co-host']
                }
            }
        })
    }



    const options = {
        where: {
            groupId: req.params.groupId
        },
        attributes: ['userId', 'status']
    }

    if (req.user) {
        if (!auth && req.group.organizerId !== req.user.id) {
        options.where.status = {
            [Op.or]: ['co-host', 'member']
        }
    }
    }
    else {
        options.where.status = {
            [Op.or]: ['co-host', 'member']
        }
    }


    let members = await Membership.findAll(options)

    const arr = []

    for (let member of members) {

        member = member.toJSON()

        let user = await User.findOne({
            where: {
                id: member.userId
            },
            attributes: ['id', 'firstName', 'lastName']
        })

        delete member.userId

        user = user.toJSON()

        user.Membership = {
            ...member
        }

        arr.push(user)

    }

    return res.json({
        Members: [...arr]
    })
})

router.delete('/:groupId/membership', [requireAuth, groupExists, groupAuthorized], async (req, res) => {

    if (req.err) {
        return res.json(req.err)
    }

    const group = await Group.findByPk(req.params.groupId)


    if (!group) {
        res.status(403)
        return res.json({
            message: "Group couldn't be found"
        })
    }

    const user = await User.findByPk(req.body.memberId)

    if (!user) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            errors: {
                memberId: "User couldn't be found"
            }
        })
    }

    let member = await Membership.findOne({
        where: {
            userId: req.body.memberId,
            groupId: req.params.groupId
        }
    })

    if (!member) {
        res.status(404)
        return res.json({
            message: "Membership does not exist for this User"
        })
    }

    if (group.organizerId !== req.user.id && member.status !== 'host' && req.user.id !== member.userId) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    await member.destroy()

    return res.json({
        message: "Successfully deleted membership from group"
    })
})

router.post('/:groupId/membership', [groupExists, requireAuth], async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }


    const member = await Membership.findOne({
        where: {
            groupId: req.params.groupId,
            userId: req.user.id
        }
    })

    if (!member) {
        const newMember = await Membership.create({
            groupId: req.params.groupId,
            userId: req.user.id,
            status: 'pending'
        })

        await newMember.save()

        return res.json({
            memberId: newMember.id,
            status: 'pending'
        })
    }

    if (member.status === 'pending') {
        res.status(400)
        return res.json({
            message: "Membership has already been requested"
        })
    }

    if (member.status === 'member' || member.status === 'co-host' || member.status === 'host') {
        res.status(400)
        return res.json({
            message: "User is already a member of the group"
        })
    }


})

router.put('/:groupId/membership', [requireAuth, groupExists], async (req, res) => {

    if (req.err) {
        return res.json(req.err)
    }

    console.log(req.body)

    let member = await Membership.findOne({
        where: {
            userId: req.body.memberId,
            groupId: req.params.groupId
        }
    })

    const user = await User.findByPk(member.userId)

    if (!user) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            errors: {
                memberId: "User couldn't be found"
            }
        })
    }

    if (req.body.status === 'pending') {
        res.status(400)
        return res.json({
            message: "Validations Error",
            errors: {
                status: "Cannot change a membership status to pending"
            }
        })
    }

    if (req.body.status === 'co-host') {
        if (req.group.organizerId !== req.user.id) {
            res.status(403)
            return res.json({
                message: "Forbidden"
            })
        }
    }

    if (req.body.status === 'member') {
        const userMember = await Membership.findOne({
            where: {
                userId: req.user.id
            }
        })
        if (req.group.organizerId !== req.user.id && userMember.status !== 'co-host') {
            res.status(403)
            return res.json({
                message: "Forbidden"
            })
        }
    }

    await member.set({
        status: req.body.status
    })

    await member.save()

    member = member.toJSON()
    member.memberId = member.userId

    delete member.userId
    delete member.createdAt
    delete member.updatedAt

    return res.json(member)

})

module.exports = router
