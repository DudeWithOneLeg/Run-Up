const express = require('express');
const router = express.Router();
const { User, Event, Group, Venue, EventImage, Membership, Attendance } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { Op } = require('sequelize')

const isGroupMember = async(req, res, next) => {
    const member = await Membership.findOne({
        groupId: req.params.groupId,
        userId: req.user.id
    })
    if (member) {
        req.isMember = 'true'
    }
    return next()
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

const validateEvent = [
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

const eventExists = async(req, res, next) => {

    let event = await Event.findOne({
        where: {
            id: req.params.eventId
        },
        include: [{
            model: Group,
            attributes: ['id', 'name', 'city', 'state']
        },
        {
            model: Venue,
            attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
        },
        {
            model: EventImage,
            attributes: ['id', 'url', 'preview']
        },
    ],
        attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'capacity', 'price', 'startDate', 'endDate']
    })
    console.log(event)

    if (!event) {
        console.log("hello")
        res.status(404)
        req.err = {
            message: "Event couldn't be found"
        }
        return next()
    }

    req.params.groupId = event.Group.id
    req.params.venueId = event.venueId
    req.event = event
    return next()
}

const eventAuthorized = async(req, res, next) => {
    const authUsers = ['co-host', 'host']
    let event = await Event.findByPk(req.params.eventId, {
        include: [{
            model: Group,
            include: {
                model: Membership,
                where: {
                    userId: req.user.id
                }
            }
        },
        {
            model: Attendance,
            where: {
                userId: req.user.id
            }
        }]
    })
    if (!event) {
        return next()
    }

    event = event.toJSON()

    if (event.Group.Memberships.status === 'co-host') {
        req.authorized = 'true'
    }

    if (!authUsers.includes(event.Group.Memberships.status && !event.Attendances.userId)) {
        res.status(403)
        req.err = {
            message: "Forbidden"
        }
        return next()
    }
    return next()
}

const groupExists = async (req, res, next) => {

    if (!req.event) {
        return next()
    }

    let group = await Group.findByPk(req.params.groupId, {
        include: Membership
    })

    console.log(req.params.groupId)

    if (!group) {
        res.status(404)
        req.err = {
            message: "Group couldn't be found"
        }
        return next()
    }

    req.group = group

    return next()
}

const groupAuthorized = (req, res, next) => {
    console.log(req.group)
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

const eventDateBool = (req, res, next) => {
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)

    if (endDate > startDate) {
        req.params.endDateBool = 'true'
    }
    next()
}

const ge= (req, res, next) => {

}

router.get('/', async (req, res) => {
    const events = await Event.findAll({
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

router.get('/:eventId', eventExists, async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    return res.json(req.event)

})

router.post('/:eventId/images', [eventExists, eventAuthorized, requireAuth], async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    req.body.eventId = req.params.eventId

    let image = await EventImage.create(req.body)

    image = image.toJSON()

    delete image.createdAt
    delete image.updatedAt
    delete image.eventId

    return res.json(image)
})

router.put('/:eventId', [eventExists, eventAuthorized, venueExists, eventDateBool, validateEvent, groupExists, groupAuthorized, requireAuth], async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }
    const event = await Event.findByPk(req.params.eventId)
    console.log(event)
    // for (keys of Object.keys(req.body)) {
    //     event[keys] = req.body[keys]
    // }
    event.set(req.body)

    await event.save()
    return res.json(event)
})

router.delete('/:eventId', [eventExists, eventAuthorized, requireAuth], async(req, res) => {
    if (req.err) {
        res.json(req.err)
    }
    const event = await Event.findByPk(req.params.eventId)
    await event.destroy()
    return res.json({
        message: "Successfully deleted"
      })
})

router.get('/:eventId/attendees', [eventExists, groupExists], async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    const options = {
        include: {
            model: Attendance,
            where: {
                eventId: req.params.eventId
            },
            attributes: ['status']
        },
        attributes: ['id', 'firstName', 'lastName']
    }

    if (!req.authorized) {
        options.include.where.status = {[Op.or]: ['attending', 'waitlist']}
    }

    const attend = await User.findAll(options)

    return res.json({
        Attendees: attend
    })
})

router.post('/:eventId/attendance', [eventExists, requireAuth, groupExists, isGroupMember], async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    const attendance = await Attendance.findOne({
        where: {
            userId: req.user.id
        }
    })

    if (attendance.status === 'pending') {
        res.status(400)
        return res.json({
            message: "Attendance has already been requested"
        })
    }

    if (attendance.status === 'attending') {
        res.status(400)
        return res.json({
            message: "User is already an attendee of the event"
          })
    }

    req.body.groupId = req.params.groupId
    req.body.eventId = req.params.eventId

    const attenddance = await Attendance.create(req.body)

    attendance = attendance.toJSON()
    delete attendance.createdAt
    delete attendance.updatedAt

    return res.json(attenddance)
})

router.put('/:event:id/attendance', [requireAuth, eventExists, groupExists, groupAuthorized], async(req, res) => {

    if (req.err) {
        return res.json(req.err)
    }

    if (req.body.status === 'pending') {
        res.status(400)
        return res.json({
            message: "Cannot change an attendance status to pending"
          })
    }

    if (!req.authorized) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    let attend = await Attendance.findOne({
        where: {
            userId: req.body.userId,
            eventId: req.params.eventId
        }
    })

    if (!attend) {
        res.status(404)
        return res.json({
          message: "Attendance between the user and the event does not exist"
        })
    }

    attend = attend.toJSON()
    attend.set({status: req.body.status})

    await attend.save()

    delete attend.createdAt
    delete attend.updatedAta

    return res.json(attend)

})

module.exports = router
