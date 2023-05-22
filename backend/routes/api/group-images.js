const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { User, Event, Group, Venue, EventImage, Membership, Attendance, GroupImage } = require('../../db/models');

const isMember = async (req, res, next) => {
if (!req.groupImage) {
    res.status(404)
    return res.json({
        message: "Group Image couldn't be found"
      })
}


    let member = await Membership.findOne({
        where: {
            groupId: req.params.groupId,
            userId: req.user.id
        },
        include: Group
    })

    if (!member) {
        res.status(403)
        req.err = {
            message: "Forbidden"
        }
        return next()
    }

    if (member.status !== 'co-host') {
        res.status(403)
        req.err = {
            message: "Forbidden"
        }
        return next()
    }
    member = member.toJSON()
    req.group = member.Group
    req.member = member

    return next()
}

const groupAuthorized = (req, res, next) => {

    if (!req.group) {
        res.status(403)
        req.err = {
            message: "Forbidden"
        }
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

const groupImageExist = async(req, res, next) => {
    const image = await GroupImage.findByPk(req.params.imageId)
    if (!image) {
        res.status(404)
        req.err = {
          message: "Group Image couldn't be found"
        }
        return next()
    }

    console.log(image.groupId)

    req.params.groupId = image.groupId
    req.groupImage = image

    return next()
}

router.delete('/:imageId', [requireAuth], async(req, res) => {
    if (req.err) {
        return res.json(req.err)
    }

    const image = await GroupImage.findByPk(req.params.imageId)

    if (!image) {
        res.status(404)
        return res.json({
          message: "Group Image couldn't be found"
        })
    }

    const member = await Membership.findOne({
        where: {
            groupId: image.groupId,
            userId: req.user.id,
            status: 'co-host'
        }
    })

    const group = await Group.findByPk(image.groupId)

    if (!member && req.user.id !== group.organizerId) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    await image.destroy()

    return res.json({
        message: "Successfully deleted"
      })


})

module.exports = router
