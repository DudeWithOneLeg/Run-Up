import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as eventActions from '../../store/events'
import * as groupActions from '../../store/groups'
import { useHistory, useParams } from "react-router-dom"
import './index.css'

export default function EventForm() {
    console.log("HELLOO")

    const history = useHistory()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [about, setAbout] = useState("")
    const [onlineOrInperson, setOnlineOrInperson] = useState("")
    const [publicOrPrivate, setPublicOrPrivate] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errors, setErrors] = useState({})
    const [capacity, setCapacity] = useState(0)
    const [imgUrl, setImgUrl] = useState('')

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(groupActions.loadGroup(params.groupId))


    }, [dispatch])

    const group = useSelector(state => state.group.group)
    const newEvent = useSelector(state => state.event.event )


    useEffect(() => {
        console.log({ name, price, about, onlineOrInperson, publicOrPrivate, startDate, endDate })
        console.log("Errors:", errors)
    }, [name, price, about, onlineOrInperson, publicOrPrivate, startDate, endDate, errors])

    const handleSumbit = (e) => {
        e.preventDefault()

        const event = { name, price, description: about, type: onlineOrInperson, private: publicOrPrivate, startDate, endDate, capacity }
        console.log(event)
        dispatch(eventActions.requestNewEvent(event, params.groupId)).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                console.log(data)
                return setErrors(data.errors)
            }
        })

        const image = {
            url: imgUrl,
            preview: true
        }

        dispatch(eventActions.loadEvents())
        dispatch(eventActions.postEventImg(newEvent.id, image))

        history.push(`/events/${newEvent.id}`)
    }
    if (!group) {
        return null
    }
    return (
        <div className="event-form-container">

            <h1>
                Create an event for {group.name}
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
                        className="event-select"
                        onChange={(e) => setOnlineOrInperson(e.target.value)}
                    >
                        <option disabled selected>	&#40;choose one	&#41;</option>
                        <option>In person</option>
                        <option>Online</option>
                    </select>

                    {
                        errors.type && <p className="errors">Event type is required</p>
                    }

                    <p>
                        Is this event private or public?
                    </p>
                    <select
                    className="event-select"
                        onChange={(e) => {
                            if (e.target.value === 'Private') setPublicOrPrivate(true)
                            if (e.target.value === 'Public') setPublicOrPrivate(false)
                        }}
                    >
                        <option disabled selected>	&#40;choose one	&#41;</option>
                        <option>Public</option>
                        <option>Private</option>
                    </select>
                    {
                        errors.private && <p className="errors">Visibility is required</p>
                    }
                    <p>How many people are you expecting?</p>
                    <input
                    onChange={(e) => setCapacity(e.target.value)}
                    >
                    </input>
                    <p>
                        What is the price for your event?
                    </p>
                    <div>
                        <input
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
                className="calendar"
                    onChange={(e) => setStartDate(e.target.value)}
                    type='datetime-local' />
                {
                    errors.startDate && <p className="errors">{errors.startDate}</p>
                }
                <p>
                    When does your event end?
                </p>
                <input
                className="calendar"
                    onChange={(e) => setEndDate(e.target.value)}
                    type='datetime-local'
                >
                </input>
                {
                    errors.endDate && <p className='errors'>{errors.endDate}</p>
                }
                </div>

                <div className='event-div'>
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
                </div>


                <p>
                    Please describe your event:
                </p>
                <textarea
                className='event-input'
                placeholder='Please include art least 30 characters'
                    onChange={(e) => setAbout(e.target.value)}
                />
                {
                    errors.description && <p className="errors">{errors.description}</p>
                }
                <button
                id='event-button'
                    type='submit'
                    disabled={Object.values(errors).length}
                >Create Event</button>
            </form>
        </div>
    )
}
