const express = require('express');
const router = express.Router();
const { User, Event, Group, Venue, EventImage, Membership, Attendance } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { Op } = require('sequelize')

const isGroupMember = async (req, res, next) => {
    const member = await Membership.findOne({
        groupId: req.params.groupId,
        userId: req.user.id
    })
    if (member) {
        req.isMember = 'true'
    }
    if (member.status === 'co-host') {
        req.isAuthorizedMember = 'true'
    }
    return next()
}

const venueExists = async (req, res, next) => {
    if (!req.event) {
        return next()
    }
    const venue = await Venue.findByPk(req.params.venueId, {
        include: [{
            model: Group,
            include: [{
                model: Membership,
                where: {
                    id: req.user.id
                }
            }]
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
    return next()
}

const validateEvent = [
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

const queryValidator = (req, res, next) => {
    const err = {
        message: "Bad Request",
        errors: {}
    }
    if (req.query.page) {
        if (!(req.query.page >= 1)) {
            req.isError = true
            err.errors.page = "Page must be greater than or equal to 1"
        }
    }
    if (req.query.size) {
        if (!(req.query.size >= 1)) {
            req.isError = true
            err.errors.size = "Page must be greater than or equal to 1"
        }
    }
    if (req.query.name) {
        if (parseInt(req.query.name) === 'number') {
            req.isError = true
            err.errors.name = "Name must be a string"
        }
    }
    if (req.query.type) {
        if (req.query.type !== 'Online' && req.query.type !== 'In person') {
            req.isError = true
            err.errors.type = "Type must be 'Online' or 'In Person'"
        }
    }
    if (req.query.startDate) {
        const date = new Date(req.query.startDate)
        if (!(!isNaN(date))) {
            req.isError = true
            err.errors.startDate = "Start date must be a valid datetime"
        }
    }

    if (req.isError === true) {

        res.status(400)
        req.err = err
    }

    return next()
}


const eventExists = async (req, res, next) => {

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

    if (!event) {
        res.status(404)
        req.err = {
            message: "Event couldn't be found"
        }
        return next()
    }


    event = event.toJSON()

    const numAttending = await Attendance.count({
        where: {
            eventId: event.id,
            status: 'attending'
        }
    })
    event.numAttending = numAttending
    if (event.Group) {
        req.params.groupId = event.Group.id
    }
    if (event.venueId) {
       req.params.venueId = event.venueId
    }

    req.event = event
    return next()
}

const eventAuthorized = async (req, res, next) => {
    let event = await Event.findOne({
        where: {
            id: req.params.eventId
        },
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

    if (event.Group.Memberships[0].status === 'co-host' || event.Group.Memberships[0].status === 'host' || event.Attendances[0].status === 'attending') {
        req.authorized = 'true'
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

router.get('/', [queryValidator], async (req, res) => {
    if (req.isError) {
        return res.json(req.err)
    }

    const options = {
        include: [{
            model: Group,
            attributes: ['id', 'name', 'city', 'state']
        }, {
            model: Venue,
            attributes: ['id', 'city', 'state']
        }],
        attributes: ['id', 'groupId', 'name', 'type', 'startDate', 'endDate']
    }

    if (!req.query.page) {
        req.query.page = 1
    }
    else if (req.query.page > 10) {
        req.query.page = 10
    }

    if (!req.query.size) {
        req.query.size = 20
    }
    else if (req.query.size > 20) {
        req.query.size = 20
    }

    if (req.query.name) {
        console.log(req.query)
        if (!options.where) {
            options.where = {}
        }
        options.where.name = req.query.name
    }

    if (req.query.type) {
        if (!options.where) {
            options.where = {}
        }
        options.where.type = req.query.type
    }

    if (req.query.startDate) {
        if (!options.where) {
            options.where = {}
        }
        options.where.startDate = req.query.startDate
    }

    options.limit = req.query.size
    options.offset = (req.query.page - 1) * req.query.size

    const events = await Event.findAll(options)

    if (!events[0]) {
        res.status(404)
        return res.json({
            message: "No groups found"
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
                preview: true,
            },
            attributes: ['url']

        })

        if (preview) {
            event.previewImage = preview.url
        }
        else {
            event.previewImage = "No preview images found"
        }

        event.numAttending = numAttending
        events[index] = event
    }

    res.json(events)
})

router.get('/:eventId', eventExists, async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }


    return res.json(req.event)

})

router.post('/:eventId/images', [eventExists, requireAuth], async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    const attend = await Attendance.findOne({
        where: {
            eventId: req.params.eventId,
            status: 'attending'
        }
    })

    const event = await Event.findOne({
        where: {
            id: req.params.eventId
        },
        include: [
            {
                model: Group
            }
        ]
    })

    const member = await Membership.findOne({
        where: {
            userId: req.user.id
        }
    })

    if (event.Group.organizerId) {
        if (event.Group.organizerId !== req.user.id) {
            req.err = true
        }
    }

    if (!attend && req.err && member.status !== 'co-host' && member.status !== 'host') {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }


    req.body.eventId = req.params.eventId

    let image = await EventImage.create(req.body)

    image = image.toJSON()

    delete image.createdAt
    delete image.updatedAt
    delete image.eventId

    return res.json(image)
})

router.put('/:eventId', [eventDateBool, validateEvent, requireAuth], async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    let event = await Event.findByPk(req.params.eventId)

    if (!event) {
        res.status(404)
        return res.json({
            "message": "Event couldn't be found"
        })
    }

    const member = await Membership.findOne({
        where: {
            groupId: event.groupId,
            status: 'co-host'
        }
    })

    const host = await Group.findByPk(event.groupId)

    if (!member && host.organizerId !== req.user.id) {
        res.status(404)
        return res.json({
            message: "Forbidden"
        })
    }

    const venue = await Venue.findByPk(req.body.venueId)

    if (!venue) {
        res.status(404)
        return res.json({
            message: "Venue couldn't be found"
          })
    }


    let newEvent = event.set(req.body)
    newEvent = newEvent.toJSON()

    await event.save()

    delete newEvent.createdAt
    delete newEvent.updatedAt

    return res.json(newEvent)

})

router.delete('/:eventId', [ requireAuth], async (req, res) => {
    if (req.err) {
        res.json(req.err)
    }

    let event = await Event.findByPk(req.params.eventId)

    if (!event) {
        res.status(404)
        return res.json({
            "message": "Event couldn't be found"
        })
    }

    const member = await Membership.findOne({
        where: {
            groupId: event.groupId,
            status: 'co-host'
        }
    })

    const host = await Group.findByPk(event.groupId)

    if (!member && host.organizerId !== req.user.id) {
        res.status(404)
        return res.json({
            message: "Forbidden"
        })
    }


    const newEvent = await Event.findByPk(req.params.eventId)
    await newEvent.destroy()
    return res.json({
        message: "Successfully deleted"
    })
})

router.get('/:eventId/attendees', [eventExists], async (req, res) => {
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

    const group = await Group.findOne({
        where: {
            id: req.event.groupId
        }
    })

    const member = await Membership.findOne({
        where: {
            groupId: req.event.groupId,
            status: 'co-host'
        }
    })

    if (group) {
        if (group.organizerId !== req.userId && !member) {
        options.include.where.status = { [Op.or]: ['attending', 'waitlist'] }
        }
    }

    if (!group) {
        res.status(404)
        return res.json({
            message: "We found an Event but no Group with the Events Group ID"
        })
    }

    const attend = await User.findAll(options)

    return res.json({
        Attendees: attend
    })
})

router.post('/:eventId/attendance', [eventExists, requireAuth], async (req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    const member = await Membership.findOne({
        where: {
            userId: req.body.userId,
            groupId: req.event.groupId,
            status: 'member'
        }
    })

    if (!member) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    let attendance = await Attendance.findOne({
        where: {
            userId: req.body.userId,
            eventId: req.params.eventId
        }
    })

    if (!attendance) {
        req.body.groupId = req.params.groupId
    req.body.eventId = req.params.eventId

    let attenddance = await Attendance.create(req.body)

    attenddance = attenddance.toJSON()

    delete attenddance.createdAt
    delete attenddance.updatedAt

    return res.json(attenddance)
    }

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


})

router.put('/:eventId/attendance', [requireAuth, eventExists, groupExists, groupAuthorized], async (req, res) => {

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

    if (attend.status === 'attending') {
        res.status(400)
        return res.json({
            message: "User is already attending"
          })
    }


    await attend.set({ status: req.body.status })

    await attend.save()
    attend = attend.toJSON()
    delete attend.createdAt
    delete attend.updatedAt

    return res.json(attend)

})

router.delete('/:eventId/attendance', [requireAuth, eventExists], async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    const member = await Membership.findOne({
        where: {
            userId: req.body.userId
        },
        include: [
            {
                model: Group
            }
        ]
    })

    if (!member) {
        res.status(404)
        return res.json({
            message: "Membership couldn't be found with that user Id"
        })
    }

    if (!member.Group) {
        res.status(403)
        return res.json({
            message: "For some reason we couldnt find a group associated with the provided user's membership"
        })
    }

    if (member.Group.organizerId !== req.user.id && req.body.userId !== req.user.id) {
        res.status(403)
        return res.json({
            message: "Only the User or organizer may delete an Attendance"
        })
    }

    const attend = await Attendance.findOne({
        where: {
            userId: req.body.userId,
            eventId: req.params.eventId
        }
    })

    if (!attend) {
        res.status(404)
        return res.json({
            message: "Attendance does not exist for this User"
          })
    }

    await attend.destroy()

    return res.json({
        message: "Successfully deleted attendance from event"
      })

})

module.exports = router
