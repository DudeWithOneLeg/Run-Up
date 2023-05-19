const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { User, Event, Group, Venue, EventImage, Membership, Attendance, GroupImage } = require('../../db/models');

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

const groupImageExist = (req, res, next) => {
    const image = GroupImage.findByPk(req.params.imageId)
    if (!image) {
        res.status(404)
        req.err = {
          message: "Group Image couldn't be found"
        }
        return next()
    }
    req.params.groupId = image.groupId
    req.groupImage = image
    return next()
}

router.delete('/:imageId', [requireAuth, groupImageExist, groupExists, groupAuthorized], async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    await req.groupImage.destroy()


})

module.exports = router
