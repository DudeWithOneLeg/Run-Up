import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as eventActions from '../../store/events'
import * as groupActions from '../../store/groups'
import { useHistory, useParams } from "react-router-dom"
import './index.css'

export default function UpdateEventForm() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const params = useParams()
    const dispatch = useDispatch()

    if (!user) {
        history.push('/')
    }

    const [event, setEvent] = useState({})
    // const [imgUrl, setImgUrl] = useState('')

    const oldGroup = useSelector(state => state.group.group)
    const group = { ...oldGroup }

    useEffect(() => {
        const fetchData = async () => {
            const eventData = dispatch(eventActions.loadEvent(params.eventId));
            const eventResponse = await eventData
            if (eventResponse && eventResponse.errors) return console.log(eventResponse.errors)
            setEvent(eventResponse)
        if (event.groupId) {
            dispatch(groupActions.loadGroup(event.groupId))
        }

    }
    fetchData()
    setName(event.name)
    setAbout(event.description)
    setPrice(event.price)
    setOnlineOrInperson(event.type)
    setPublicOrPrivate(event.private ? 'Private' : 'Public')
    setStartDate(event.startDate)
    setEndDate(event.endDate)
    setCapacity(event.capacity)
    console.log('Evennntt', event)

}, [dispatch, event.groupId, params.eventId]);


const [name, setName] = useState(event.name ? event.name : '')
const [price, setPrice] = useState(event.price ? event.price : '')
const [about, setAbout] = useState(event.description ? event.description : '')
const [onlineOrInperson, setOnlineOrInperson] = useState(event.type ? event.type : '')
const [publicOrPrivate, setPublicOrPrivate] = useState(event.private)
const [startDate, setStartDate] = useState(event.startDate ? event.startDate : '')
const [endDate, setEndDate] = useState(event.endDate ? event.endDate : '')
const [errors, setErrors] = useState({})
const [capacity, setCapacity] = useState(event.capacity ? event.capacity : '')

    useEffect(() => {
        console.log({ name, price, about, onlineOrInperson, capacity, publicOrPrivate, startDate, endDate })
        console.log("Errors:", errors)
    }, [name, price, about, onlineOrInperson, publicOrPrivate, startDate, endDate, capacity, errors])





    const handleSumbit = async (e) => {


        e.preventDefault()

        const newEvent = {name,price, description: about, type: onlineOrInperson, capacity, startDate, endDate, venueId: event.venueId }

        console.log('new event',newEvent)
        dispatch(eventActions.requestUpdateEvent(newEvent, event.id)).then(() => {

        dispatch(eventActions.loadEvents())

        history.push(`/events/${event.id}`)

        }).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                console.log(data.errors)
                return setErrors({...data.errors})

            }
        })



    }

    if (!Object.values(event).length || !Object.values(group).length) {
        return null
    }
    if (event.id) {
        event.startDate = event.startDate.split(':00.000Z').join('')
        event.endDate = event.endDate.split(':00.000Z').join('')
    }

    if (!user || user.id !== group.organizerId) {
        history.push('/')
    }

    console.log(user.id, group.organizerId)

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
                        defaultValue={name}
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
                        defaultValue={onlineOrInperson}
                    >
                        <option>In person</option>
                        <option>Online</option>
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
                        <option selected={!publicOrPrivate}>Public</option>
                        <option selected={publicOrPrivate}>Private</option>
                    </select>
                    {
                        errors.private && <p className="errors">{errors.private}</p>
                    }
                    <p>How many people are you expecting?</p>
                    <input
                        id='capacity'
                        className='event-input'
                        defaultValue={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    >
                    </input>
                    <p>
                        What is the price for your event?
                    </p>
                    <div>
                        <input
                            defaultValue={price}
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
                        value={startDate}
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
                        value={endDate}
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
                        defaultValue={about}
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
                >Update Event</button>
            </form>
        </div>
    )
}
