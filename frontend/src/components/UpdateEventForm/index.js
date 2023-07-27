import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as eventActions from '../../store/events'
import * as groupActions from '../../store/groups'
import { useHistory, useParams } from "react-router-dom"
import './index.css'

export default function UpdateEventForm() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    if (!user) {
        history.push('/')
    }

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [about, setAbout] = useState("")
    const [onlineOrInperson, setOnlineOrInperson] = useState("")
    const [publicOrPrivate, setPublicOrPrivate] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errors, setErrors] = useState({})
    const [capacity, setCapacity] = useState(0)
    // const [imgUrl, setImgUrl] = useState('')

    const params = useParams()
    const dispatch = useDispatch()

    const event = useSelector(state => state.event.eventInfo)
    const oldEvent = { ...event }
    const oldGroup = useSelector(state => state.group.group)
    const group = { ...oldGroup }

    useEffect(() => {
        dispatch(eventActions.loadEvent(params.eventId));
        if (oldEvent.groupId) {
            console.log('IS THIS THE LINE?')
            dispatch(groupActions.loadGroup(oldEvent.groupId))
        }

    }, [dispatch, oldEvent.groupId, params.eventId]);

    useEffect(() => {
        console.log({ name, price, about, onlineOrInperson, publicOrPrivate, startDate, endDate })
        console.log("Errors:", errors)
    }, [name, price, about, onlineOrInperson, publicOrPrivate, startDate, endDate, errors])



    const handleSumbit = (e) => {
        e.preventDefault()

        const newEvent = {}

        if (name) {
            newEvent.name = name
        }
        if (price) {
            newEvent.price = price
        }
        if (about) {
            newEvent.description = about
        }
        if (onlineOrInperson) {
            newEvent.onlineOrInperson = onlineOrInperson
        }
        if (publicOrPrivate) {
            newEvent.publicOrPrivate = publicOrPrivate
        }
        if (capacity) {
            newEvent.capacity = capacity
        }
        if (startDate) {
            newEvent.startDate = startDate
        }
        if (endDate) {
            newEvent.endDate = endDate
        }

        console.log(newEvent)
        dispatch(eventActions.requestNewEvent(newEvent, oldEvent.groupId)).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                console.log(data)
                return setErrors(data.errors)
            }
        })
        dispatch(eventActions.loadEvents())

        history.push(`/events/${oldEvent.id}`)
    }

    if (!oldEvent || !group) {
        return null
    }
    if (oldEvent.id) {
        oldEvent.startDate = oldEvent.startDate.split(':00.000Z').join('')
        oldEvent.endDate = oldEvent.endDate.split(':00.000Z').join('')
    }

    return (
        <div className="event-form-container">

            <h1>
                Update your event for {group.name}
            </h1>
            <form
                id='event-form'
                onSubmit={handleSumbit}
            >
                <div className='event-div'>
                    <p>
                        What is the name of your event?
                    </p>
                    <input
                        id='event-name'
                        defaultValue={oldEvent.name}
                        className='event-input'
                        required
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                    {

                        errors.name && <p className="errors">{errors.name}</p>

                    }
                </div>
                <div className='event-div'>
                    <p>
                        Is this an in person or online event?
                    </p>
                    <select
                        className="update-event-select"
                        onChange={(e) => setOnlineOrInperson(e.target.value)}
                    >
                        <option selected={oldEvent.type === 'In person'}>In person</option>
                        <option selected={oldEvent.type === 'Online'}>Online</option>
                    </select>

                    {
                        errors.type && <p className="errors">{errors.type}</p>
                    }

                    <p>
                        Is this event private or public?
                    </p>
                    <select
                        className="update-event-select"
                        onChange={(e) => {
                            if (e.target.value === 'Private') setPublicOrPrivate(true)
                            if (e.target.value === 'Public') setPublicOrPrivate(false)
                        }}
                    >
                        <option selected={oldEvent.private === false}>Public</option>
                        <option selected={oldEvent.private === false}>Private</option>
                    </select>
                    {
                        errors.private && <p className="errors">{errors.private}</p>
                    }
                    <p>How many people are you expecting?</p>
                    <input
                        id='capacity'
                        className='event-input'
                        defaultValue={oldEvent.capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    >
                    </input>
                    <p>
                        What is the price for your event?
                    </p>
                    <div>
                        <input
                            defaultValue={oldEvent.price}
                            className='event-input'
                            onClick={(e) => e.preventDefault()}
                            placeholder="$"

                            id='price'
                            onChange={(e) => setPrice(e.target.value)}
                        >
                        </input>
                    </div>

                    {
                        errors.price && <p className="errors">{errors.price}</p>
                    }
                </div>


                <div className='event-div'>
                    <p>
                        When does your event start?
                    </p>
                    <input
                        defaultValue={oldEvent.startDate}
                        className="update-calendar event-input"
                        onChange={(e) => setStartDate(e.target.value)}
                        type='datetime-local' />
                    {
                        errors.startDate && <p className="errors">{errors.startDate}</p>
                    }
                    <p>
                        When does your event end?
                    </p>
                    <input
                        value={oldEvent.endDate}
                        className="update-calendar event-input"
                        onChange={(e) => setEndDate(e.target.value)}
                        type='datetime-local'
                    >

                    </input>
                    {
                        errors.endDate && <p className='errors'>{errors.endDate}</p>
                    }
                </div>

                {/* <div className='event-div'>
                   <p>
                    Please add in image url for your event below:
                </p>

                <input
                className='event-input'
                placeholder='Image URL'
                    onChange={(e) => {
                        const extensions = ['png', 'jpg', 'jpeg']
                        let urlExtension = e.target.value.split('.')
                        urlExtension = urlExtension[urlExtension.length - 1]
                        console.log(urlExtension)

                        if (!extensions.includes(urlExtension)) {
                            console.log(!extensions.includes(urlExtension))
                            return setErrors({ imgUrl: "Image URL must end in .png, .jpg, or .jpeg" })
                        }
                        else {
                            setErrors({})
                        }
                        setImgUrl(e.target.value)
                    }}
                />
                {
                    errors.imgUrl && <p className='errors'>{errors.imgUrl}</p>
                }
                </div> */}

                <div className='event-div'>
                    <p>
                        Please describe your event:
                    </p>
                    <textarea
                        defaultValue={oldEvent.description}
                        id='event-form-textarea'
                        className='event-input'
                        placeholder='Please include art least 30 characters'
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    {
                        errors.description && <p className="errors">{errors.description}</p>
                    }
                </div>

                <button
                    id='event-button'
                    type='submit'
                    disabled={Object.values(errors).length}
                >Update Event</button>
            </form>
        </div>
    )
}
