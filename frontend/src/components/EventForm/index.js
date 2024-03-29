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
    const params = useParams()
    const dispatch = useDispatch()
    const group = useSelector(state => state.group.group)

    useEffect(() => {
        dispatch(groupActions.loadGroup(params.groupId))
    }, [dispatch, params.groupId])




    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setdescription] = useState("")
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
    const [position, setPosition] = useState({
        lat: 40.299493,
        lng: -101.950516
    })





    useEffect(() => {
        console.log({ name, price, description, onlineOrInperson, publicOrPrivate, capacity, startDate, endDate })
        if (description.length < 30 && description !== '') setErrors({description: "Description must be at least 30 characters long"})
        else setErrors({})
    console.log("Errors:", errors)
}, [name, price, description, onlineOrInperson, publicOrPrivate, startDate, endDate, capacity])





const handleSumbit = async (e) => {

    e.preventDefault()
    if (Object.values(errors).length) return

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
        let venue
        if (address !== 'Address' && city !== 'City' && state !== 'State') {
            const newVenue = dispatch(placeActions.sendVenue({
                groupId: params.groupId, address, city, state, lat, lng
            }, params.groupId))

            venue = await newVenue
        }


        const event = { name, price, description: description, type: onlineOrInperson, private: publicOrPrivate, startDate, endDate, capacity }
        if (venue && venue.id) {
            event.venueId = venue.id
        }
        let requestedEvent

        dispatch(eventActions.createNewEvent(event, params.groupId)).then(async (res) => {

            requestedEvent = res;
            console.log(requestedEvent);
            const image = {
                url: imgUrl,
                preview: true
            }
            dispatch(eventActions.loadEvents()).then(() => {
                dispatch(eventActions.postEventImg(requestedEvent.id, image)).then(() => {
                    history.push(`/events/${requestedEvent.id}`)
                }).catch(async (res) => {
                    const data = await res.json()
                    if (data.errors || data.message) {
                        console.log(data)
                    }
                })
            })
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });



    }
    if (!group) {
        return null
    }
    if (!user || user.id !== group.organizerId) {
        history.push('/')
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
                        placeholder='Event Name'
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
                    {errors.capacity && <p className="errors">{errors.capacity}</p>}
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
                                setErrors({ imgUrl: "Image URL must end in .png, .jpg, or .jpeg" })
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
                {
                    imgUrl && <>
                    <p>Preview: </p>
                    <img id='preview' src={imgUrl}/>
                    </>
                }
                </div>


                <p>
                    Please describe your event:
                </p>
                <textarea
                    className='event-input'
                    id='event-form-about'
                    placeholder='Please include art least 30 characters'
                    onChange={(e) => setdescription(e.target.value)}
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
