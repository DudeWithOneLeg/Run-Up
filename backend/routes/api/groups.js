const express = require('express')
const router = express.Router()
const { User, Group, GroupImage, Membership, Venue } = require('../../db/models')
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
        if (previewImage[0].url) {
            element.previewImage = previewImage[0].url
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
    const myGroup = await Group.findOne({
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

router.get('/:groupId', async (req, res) => {
    let group = await Group.findByPk(req.params.groupId, {
        include: [{model: GroupImage}, {model: Venue}]
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

router.post('/:groupId/images', [groupExists, requireAuth], async (req, res) => {

    req.body.groupId = req.params.groupId
    const img = await GroupImage.create(req.body)
    return res.json(img)
})

router.put('/:groupId', [validateGroup, groupExists, requireAuth], async (req, res, next) => {
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

router.delete('/:groupId', [groupExists, requireAuth], async (req, res) => {
    if (req.err) {
        res.json(req.err)
    }
    const group = await Group.findByPk(req.params.groupId)
    await group.destroy()
    res.json({
        message: "Successfully deleted"
    })
})

router.get('/:groupId/venues', [groupExists, requireAuth], async (req, res) => {
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
        }
    })
    return res.json(venues)

})

router.post('/:groupId/venues', [validateVenue, groupExists, requireAuth], async (req, res) => {
    if (req.err) {
        return res.json(req.err)
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
    req.body.groupId = req.group.id
    const venue = await Venue.create(req.body)
    res.json(venue)
})




module.exports = router
