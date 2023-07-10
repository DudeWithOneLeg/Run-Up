import { useSelector, useDispatch } from "react-redux"
import * as eventActions from '../../store/events'
import { useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import DeleteEventModal from "../DeleteEventModal"
import * as groupActions from '../../store/groups'
import './index.css'



export default function EventInfo() {
    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()

    useEffect(() => {
        dispatch(eventActions.loadEvent(params.eventId))
        dispatch(eventActions.getAttendances(params.eventId))
    }, [dispatch])

    const event = useSelector(state => state.event.eventInfo)
    const attendees = useSelector(state => state.event.eventAttend)
    const user = useSelector(state => state.session.user)
    //const img = useSelector(state => state.event.EventImages)[0].url

    if (!event || !attendees) {
        return null
    }

    console.log(" yo", attendees[0], user)

    Object.values(attendees).map((attend) => {
        let newHost
        if (attend.Attendances.status === 'host') {
            newHost = attend
        }
    })
    event.startDate = event.startDate.split('T').join(' · ')
    event.endDate = event.endDate.split('T').join(' · ')

    console.log(event)


    return (
        <div id='event-component'>
            <div id='event-info'>
                <p>&lt;<Link to='/events'>Events</Link></p>
                <h1>{event.name}</h1>
                <p>Hosted by {attendees[0].firstName} {attendees[0].lastName}</p>
            </div>
            <div id='event-comp-second'>
                <div id='event-comp-top'>
                    <img src={event.EventImages[0].url}></img>
                    <div>
                        <div id='event-comp-group'>
                            <h1>{event.Group.name}</h1>
                        </div>
                        <div id='event-comp-top-info'>
                            <div className='time-price'>
                                <img src='/images/clock.png' />
                                <div>
                                  <h3>START DATE {event.startDate}</h3>
                                  <h3>END DATE {event.endDate}</h3>
                                </div>

                            </div>
                            <div className='time-price'>
                                <img src='/images/money.png'/>
                                {event.price == 0 && <h3>FEE</h3>}
                                {event.price > 0 && <h3>{event.price}</h3>}
                            </div>
                            <div className='time-price'>
                                <img src='/images/map.png' />
                                <h3>{event.type}</h3>
                            </div>




                            {!user || user.id !== attendees[0].id && <div>
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
        </div>
    )
}
