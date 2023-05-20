const express = require('express')
const router = express.Router()
const { User, Group, GroupImage, Membership, Venue, Event } = require('../../db/models')
const { restoreUser, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

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
        .exists({ checkFalsey: true }),
    check('city')
        .exists({ checkFalsey: true }),
    check('state')
        .exists({ checkFalsey: true }),
    check('lat')
        .isDecimal(),
    check('lng')
        .isDecimal(),
    handleValidationErrors
]

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

const venueExists = async(req, res, next) => {
    if (!req.body.venueId) {
        req.params['venueExist'] = 'false'
        return next()
    }
    const venue = await Venue.findOne({
        where: {
            id: req.body.venueId
        }
    })
    console.log(venue)
    if (!venue) {
        req.params['venueExist'] = 'false'
        return next()
    }
     req.params['venueExist'] = 'true'
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
    check('venueExist')
        .contains('true')
        .withMessage('Venue does not exist'),
    check('name')
        .isLength({min: 5})
        .withMessage('Name must be at least 5 characters'),
    check('type')
        .isIn(['Online', 'In person'])
        .withMessage('Type must be Online or In person'),
    check('capacity')
        .isInt()
        .withMessage('Capacity must be an integer'),
    check('price')
        .isFloat({min: 0})
        .withMessage('Price is invalid'),
    check('description')
        .exists({checkFalsey: true})
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
    next()
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

        previewImage = await GroupImage.findAll({
            where: {
                groupId: element.id
            },
            raw: true
        })

        element.numMembers = numMembs
        if (previewImage[0]) {
            if (previewImage[0].url) {
                element.previewImage = previewImage[0].url
            }
        }

    }

    res.json({
        Groups: [groups]
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

    const numMems = await Membership.count({
        where: {
            groupId: myGroup.id
        }
    })

    const previewImg = await GroupImage.findAll({
        where: {
            groupId: myGroup.id
        }
    })

    myGroup.numMembers = numMems
    myGroup.previewImage = previewImg[0].url

    res.json({
        Groups: myGroup
    })
})

router.get('/:groupId', groupExists, async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }
    let group = await Group.findOne({
        include: [
            {
                model: GroupImage,
                atributes: {
                    exclude: ['createdAt', 'updatedAt']
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

    if (!group) {
        res.status(404)
        return res.json({
            message: "Group couldn't be found"
        })
    }

    group = group.toJSON()

    const organizer = await User.findByPk(group.organizerId, {
        raw: true
    })

    group.Organizer = organizer
    return res.json(group)
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

router.delete('/:groupId', [groupExists, groupAuthorized,requireAuth], async (req, res) => {
    if (req.err) {
        res.json(req.err)
    }
    const group = await Group.findByPk(req.params.groupId)
    await group.destroy()
    res.json({
        message: "Successfully deleted"
    })
})

router.get('/:groupId/venues', [groupExists, groupAuthorized, requireAuth], async (req, res) => {
    if (req.err) {
        res.json(req.err)
    }
    const membership = await Membership.findOne({
        where: {
            groupId: req.group.id,
            userId: req.user.id
        }
    })
    if (!membership || membership.status !== 'co-host') {
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
    return res.json(venues)

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
    if(req.err) {
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
        attributes: ['id', 'groupId', 'name', 'type', 'startDate', 'endDate']
    })
    res.json(events)
})

router.post('/:groupId/events', [ venueExists, eventDateBool, validateEvent, groupExists, groupAuthorized, requireAuth], async(req, res, next) => {
    if (req.err) {
        res.json(req.err)
    }

    req.body.groupId = req.params.groupId

    let event = await Event.create(req.body)

    event = event.toJSON()

    delete event.createdAt
    delete event.updatedAt

    res.json(event)
})

router.get('/:groupId/members', [groupExists, groupAuthorized], async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }
    const members = await Group.findOne({
        where: {
            id: req.params.groupId
        },
        attributes: [],
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
            include: {
                model: Membership,
                attributes: ['status'],
                nested: true
            }
        }]
      })

    return res.json({
        Members: members
    })
})

router.delete('/:groupId/membership', [requireAuth, groupExists], async(req, res) => {

    if (req.err) {
        return res.json(req.err)
    }

    let member = await Membership.findOne({
        where: {
            id: req.body.memberId,
            groupId: req.params.groupId
        }
    })

    return res.json(member)
})


module.exports = router
