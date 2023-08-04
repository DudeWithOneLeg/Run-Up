import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as eventActions from '../../store/events'
import * as groupActions from '../../store/groups'
import * as placeActions from '../../store/venue';
import { useHistory, useParams } from "react-router-dom"
import VenueFormModal from '../VenueFormModal'
import './index.css'

export default function EventForm() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const oldVenue = useSelector(state => state.venue.newVenue)
    const venue = {...oldVenue}



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
    const [imgUrl, setImgUrl] = useState('')
    const [address, setAddress] = useState('Address')
    const [city, setCity] = useState('City')
    const [state, setState] = useState('State')
    const [showVenue, setShowVenue] = useState(false)
    const [position, setPosition] = useState({
        lat: 40.299493,
        lng: -101.950516
    })

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(groupActions.loadGroup(params.groupId))
    }, [dispatch, params.groupId])

    const group = useSelector(state => state.group.group)
    const oldEvent = useSelector(state => state.event.event)
    const newEvent = {...oldEvent}


    useEffect(() => {
        console.log({ name, price, about, onlineOrInperson, publicOrPrivate, capacity, startDate, endDate })
        console.log("Errors:", errors)
    }, [name, price, about, onlineOrInperson, publicOrPrivate, startDate, endDate, capacity, errors])

    // useEffect(() => {
    //     if (newEvent) {
    //         const image = {
    //             url: imgUrl,
    //             preview: true
    //         }
    //         dispatch(eventActions.loadEvents()).then(() => {
    //             dispatch(eventActions.postEventImg(newEvent.id, image)).catch(async (res) => {
    //                 const data = await res.json()
    //                 if (data.errors || data.message) {
    //                     console.log(data)
    //                 }
    //             })
    //         }).then(() => {
    //             history.push(`/events/${newEvent.id}`)
    //         })


    //     }
    // }, [newEvent, dispatch, history, imgUrl])

    const handleSumbit = (e) => {

        e.preventDefault()

        const { lat, lng } = position
        console.log({
            groupId: Number(params.groupId), address, city, state, lat, lng
        })

        if (city !== 'City' || address !== 'Address' || state !== 'State') {
            console.log('YO')
            const errs = {}


            if (address === 'Address') errs.address = "Street address is required"
            if (city === 'City') errs.city = "City is required"
            if (state === 'State') errs.state = "State is required"
            console.log(errs)
            if (Object.values(errs).length) return setErrors(errs)

        }
        setErrors({})
        console.log(errors)
        if (address !== 'Address' && city !== 'City' && state !== 'State') {
            dispatch(placeActions.sendVenue({
                groupId: params.groupId, address, city, state, lat, lng
            }, params.groupId))
        }


        const event = { name, price, description: about, type: onlineOrInperson, private: publicOrPrivate, startDate, endDate, capacity, venueId: venue.id }
        console.log(event)
        dispatch(eventActions.requestNewEvent(event, params.groupId)).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                console.log('YO THERES ERRORS', data)
                return setErrors(data.errors)
            }
        })

        const image = {
            url: imgUrl,
            preview: true
        }

        dispatch(eventActions.postEventImg(newEvent.id, image)).catch(async (res) => {
            const data = await res.json()
            if (data.errors || data.message) {
                console.log(data)
            }
        })
        history.push(`/events/${newEvent.id}`)
        console.log("NEW EVENT", newEvent)

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
                        className="event-select-choose"
                        onChange={(e) => setOnlineOrInperson(e.target.value)}
                    >
                        <option disabled selected>	&#40;choose one	&#41;</option>
                        <option>In person</option>
                        <option>Online</option>
                    </select>

                    {
                        errors.type && <p className="errors">Event type is required</p>
                    }

                    {
                        onlineOrInperson === 'In person' &&
                            <VenueFormModal
                    address={address}
                    setAddress={setAddress}
                    city={city}
                    setCity={setCity}
                    state={state}
                    setState={setState}
                    position={position}
                    setPosition={setPosition}
                    errors={errors}
                    setErrors={setErrors}
                />

                    }

                    <p>
                        Is this event private or public?
                    </p>
                    <select
                        className="event-select-choose"
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
                        className="event-input"
                        id='event-capacity'
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
                        errors.endDateBool && <p className='errors'>{errors.endDateBool}</p>
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
                    id='event-form-about'
                    placeholder='Please include art least 30 characters'
                    onChange={(e) => setAbout(e.target.value)}
                />
                {
                    errors.description && <p className="errors">{errors.description}</p>
                }

                <button
                    id='event-button'
                    type='submit'
                >Create Event</button>
            </form>
        </div>
    )
}
