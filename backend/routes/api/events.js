const express = require('express');
const router = express.Router();
const { Event, Group, Venue } = require('../../db/models')

router.get('/', async (req, res) => {
    const events = await Event.findAll({
        include: [{model: Group}, {model: Venue}]
    })
    res.json(events)
})

module.exports = router
