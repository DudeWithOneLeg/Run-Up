import { useSelector, useDispatch } from "react-redux"
import * as eventActions from '../../store/events'
import { useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import DeleteEventModal from "../DeleteEventModal"
import * as groupActions from '../../store/groups'
import Venue from "../Venue"
import './index.css'



export default function EventInfo() {
    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()

    useEffect(() => {
        dispatch(eventActions.loadEvent(params.eventId))
        dispatch(eventActions.getAttendances(params.eventId))
    }, [dispatch, params.eventId])

    const oldEvent = useSelector(state => state.event.eventInfo)
    const oldAttendees = useSelector(state => state.event.eventAttend)
    const oldUser = useSelector(state => state.session.user)

    const event = {...oldEvent}
    const attendees = oldAttendees
    const user = oldUser
    //const img = useSelector(state => state.event.EventImages)[0].url

    const containerStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '0px 0px 10px 10px',
        marginBottom: '0px',
        zIndex: '0'
    }

    const mapOptions = {

        mapTypeId: 'hybrid',
        scrollwheel: false,
        draggable: false,
        mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: window.google.maps.ControlPosition.LEFT_TOP,
        },
        fullscreenControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_TOP,
        }
    }

    if (!event || !attendees) {
        return null
    }


    event.startDate = event.startDate.split('T').join(' · ')
    event.endDate = event.endDate.split('T').join(' · ')


    event.startDate = event.startDate.split('T').join(' · ').split(':00.000Z').join('')

          let hour = event.startDate.split(' · ')[1].split(':')[0]

          if (hour > 12 && !event.startDate.includes('PM') && !event.startDate.includes('AM')) {

            const oldHour = hour
            hour -= 12
            event.startDate = event.startDate.replace(oldHour, hour)
            event.startDate += ' PM'
          }
          else if (hour < 12 && !event.startDate.includes('AM') && !event.startDate.includes('PM')) {

            event.startDate += ' AM'
          }
          event.endDate = event.endDate.split('T').join(' · ').split(':00.000Z').join('')

          let hour2 = event.endDate.split(' · ')[1].split(':')[0]

          if (hour2 > 12 && !event.endDate.includes('PM') && !event.endDate.includes('AM')) {

            const oldHour = hour2
            hour2 -= 12
            event.endDate = event.endDate.replace(oldHour, hour2)
            event.endDate += ' PM'
          }
          else if (hour2 < 12 && !event.endDate.includes('AM') && !event.endDate.includes('PM')) {

            event.endDate += ' AM'
          }




    return (
        <div id='event-component'>
            <div id='event-info'>
                <p className="back-button">&lt;
                    <Link to='/events/1/10'>
                        Events
                    </Link>
                    </p>
                <h1>{event.name}</h1>
                <p>Hosted by {attendees[0].firstName} {attendees[0].lastName}</p>
            </div>
            <div id='event-comp-second'>
                <div id='event-comp-top'>
                    <img src={event.EventImages[0].url} alt='event'></img>
                    <div>
                        <div id='event-comp-group'>
                            <h1>{event.Group.name}</h1>
                        </div>
                        <div id='event-comp-top-info'>
                            <div className='time-price'>
                                <img src='/images/clock.svg' alt='clock'/>
                                <div>
                                  <h3>START DATE {event.startDate}</h3>
                                  <h3>END DATE {event.endDate}</h3>
                                </div>

                            </div>
                            <div className='time-price'>
                                <img src='/images/money.svg' alt='dollar sign'/>
                                {event.price == 0 && <h3>FREE</h3>}
                                {event.price > 0 && <h3>{event.price}</h3>}
                            </div>
                            <div className='time-price'>
                                <img src='/images/map.svg' alt='map-pin'/>
                                <h3>{event.type}</h3>
                            </div>




                            {(!user || user.id === attendees[0].id) && <div>
                                <button className='group-buttons'
                                onClick={() => {
                                    dispatch(groupActions.loadGroup(event.groupId)).then(() => history.push(`/events/${event.id}/edit`))

                                }}
                                >Update</button>
                                <OpenModalButton
                                    id='login'
                                    buttonText="Delete"
                                    modalComponent={<DeleteEventModal />} />
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
            <div id='event-comp-details'>
                <h1>Details</h1>
                <p>{event.description}</p>
            </div>
            {
                event.Venue.id && <Venue address={event.Venue.address} city={event.Venue.city} state={event.Venue.state} coord={{lat: event.Venue.lat, lng: event.Venue.lng}} stylingId={'event-venue-component'} containerStyle={containerStyle} mapOptions={mapOptions}/>
            }
        </div>
    )
}
