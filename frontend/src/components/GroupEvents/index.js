import { useSelector, useDispatch } from "react-redux"
import * as groupEventsActions from '../../store/events'
import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import './index.css'

export default function GroupEvents() {

    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [events, setEvents] = useState({})

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

    }

    useEffect(() => {
        asyncFunc()

    }, [dispatch, params.id])

    const asyncFunc = async () => {

        const res = dispatch(groupEventsActions.loadGroupEvents(params.id))
        const data = await res
        setEvents(data)
        console.log(data)
    }

    if (!events) return null
    return (
        <div id='group-events'>
            <h1> {sortedEvents[0].length} Upcoming Events</h1>
            {
                sortedEvents[0] && sortedEvents[0].map((event) => {
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
                    return (<div
                        onClick={() => {
                            history.push(`/events/${event.id}`)
                        }}
                        className='group-events-card more-info'>
                        <div id='group-events-card-inner-info'>
                            <img className='group-events-img' src={event.previewImage} alt=''></img>
                            <div id='group-events-card-info'>
                                <p>{event.startDate}</p>
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
                    return (<div
                        onClick={() => {
                            history.push(`/events/${event.id}`)
                        }}
                        className='group-events-card more-info'>
                        <div id='group-events-card-inner-info'>
                            <img className='group-events-img' src={event.previewImage} alt=''></img>
                            <div id='group-events-card-info'>
                                <p>{event.startDate}</p>
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
