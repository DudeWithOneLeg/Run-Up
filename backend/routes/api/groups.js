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
        .isLength({ min: 60 })
        .withMessage('About must be 50 characters or more'),
    check('about')
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

router.use(restoreUser)

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
        element.previewImage = previewImage[0].url
    }

    res.json({
        Groups: [groups]
    })
})

router.post('/', [validateGroup, requireAuth], async (req, res) => {

    const newGroup = await Group.create(req.body)
    res.json(newGroup)
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
    res.json(group)
})




module.exports = router
