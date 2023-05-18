const express = require('express');
const router = express.Router();
const { Event, Group, Venue, EventImage, Membership, Attendance } = require('../../db/models')



const eventExists = async(req, res, next) => {
    if (!req.params.eventId) {
        res.status(404)
        req.err = {
            message: "Event couldn't be found"
        }
        return next()
    }
    const event = await Event.findOne({
        where: {
            id: req.params.eventId
        },
        include: [{model: Group}, {model: Venue}, {model: EventImage}]
    })
    req.event = event
    return next()
}

const eventAuthorized = async(req, res, next) => {
    const authUsers = ['co-host', 'host']
    const event = await Event.findByPk(req.params.eventId, {
        include: [{model: Group, include: {model: Membership, where: {userId: req.user.id}}}, {model: Attendance, where: {userId: req.user.id}}],
        raw: true
    })
    if (!authUsers.includes(event['Group.Memberships.status'] && !event['Attendance.userId'])) {
        res.status(403)
        req.err = {
            message: "Forbidden"
        }
        return next()
    }

    return next()
}



router.get('/', async (req, res) => {
    const events = await Event.findAll({
        include: [{model: Group}, {model: Venue}]
    })
    res.json(events)
})

router.get('/:eventId', eventExists, async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    return res.json(req.event)

})

router.post('/:eventId/images', [eventExists, eventAuthorized], async(req, res) => {
    if (req.err) {
        res.json(req.err)
    }
    req.body.eventId = req.params.eventId
    const image = await EventImage.create(req.body)
    return res.json(image)
})

module.exports = router
