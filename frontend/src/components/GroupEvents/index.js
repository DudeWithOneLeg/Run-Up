import { useSelector, useDispatch } from "react-redux"
import * as groupEventsActions from '../../store/events'
import { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"

import './index.css'


export default function GroupEvents() {

    const params = useParams()
    const history = useHistory()

    const dispatch = useDispatch()

    const oldEvents = useSelector(state => state.event.groupEvents)

    const events = {...oldEvents}

    console.log("YO THESE R EVENTS FROM GROUP EVENTS", events)
const sortedEvents = [[], []]
const date = new Date()

    if (events) {

    Object.values(events).map((event) => {

        if (new Date(event.startDate) > date) {
             sortedEvents[0].push(event)
        }
        else {
             sortedEvents[1].push(event)
        }
    })

    console.log('DATE:', date, 'SORTED EVENTS:', sortedEvents)
    }



    useEffect(() => {
       dispatch(groupEventsActions.loadGroupEvents(params.id)).catch( async (res) => {
        const data = await res.json()
        if (data && data.errors) {
            console.log(data)
        }
       })
    },[dispatch, params.id])



    if (!events) return null
    return (
        <div id='group-events'>
            <h1> {sortedEvents[0].length} Upcoming Events</h1>
            {
                sortedEvents[0] && sortedEvents[0].map((event) => {
                    const startDate = event.startDate.split('T').join(' · ')
                    return (<div
                        onClick={() => {
                            history.push(`/events/${event.id}`)
                        }}
                    className='group-events-card more-info'>
                        <div id='group-events-card-inner-info'>
                            <img className='group-events-img' src={event.previewImage} alt=''></img>
                            <div id='group-events-card-info'>
                                <p>{startDate}</p>
                                <h1>{event.name}</h1>
                                {event.Venue && <p>{event.Venue.city}, {event.Venue.state}</p>}

                            </div>
                        </div>
                            <p className='group-events-about'>{event.description}</p>
                    </div>)

                })
            }
            <h1> {sortedEvents[1].length} Past Events</h1>
            {
                sortedEvents[1] && sortedEvents[1].map((event) => {
                    const startDate = event.startDate.split('T').join(' · ')
                    return (<div
                        onClick={() => {
                            history.push(`/events/${event.id}`)
                        }}
                    className='group-events-card more-info'>
                        <div id='group-events-card-inner-info'>
                            <img className='group-events-img' src={event.previewImage} alt=''></img>
                            <div id='group-events-card-info'>
                                <p>{startDate}</p>
                                <h1>{event.name}</h1>
                                {event.Venue && <p>{event.Venue.city}, {event.Venue.state}</p>}

                            </div>
                        </div>
                            <p className='group-events-about'>{event.description}</p>
                    </div>)

                })
            }
        </div>
    )
}
