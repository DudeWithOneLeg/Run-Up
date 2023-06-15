const express = require('express')
const router = express.Router()
const { EventImage, Membership, Group, Event } = require('../../db/models')
const { restoreUser, requireAuth } = require('../../utils/auth');



const isMember = async (req, res, next) => {
    if (!req.eventImage) {
        res.status(404)
        return res.json({
            message: "Event Image couldn't be found"
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

    const eventImageExist = async(req, res, next) => {
        const image = await EventImage.findOne({
            where: {
                id: req.params.imageId
            },
            include: Event
        })
        if (!image) {
            res.status(404)
            req.err = {
              message: "Event Image couldn't be found"
            }
            return next()
        }




        req.params.groupId = image.Event.groupId
        req.eventImage = image

        return next()
    }

router.delete('/:imageId', [requireAuth, eventImageExist], async(req, res) => {

    if (req.err) {
        return res.json(req.err)
    }

    const group = await Group.findByPk(req.params.groupId)
    const member = await Membership.findOne({
        where: {
            userId: req.user.id,
            groupId: req.params.groupId,
            status: 'co-host'
        }
    })

    if (!member && group.organizerId !== req.user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }

    const image = await EventImage.findByPk(req.params.imageId)


    await image.destroy()

    return res.json({
      message: "Successfully deleted"
    })

})

module.exports = router
