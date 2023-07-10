import { useSelector, useDispatch } from "react-redux"
import * as groupEventsActions from '../../store/events'
import { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"

import './index.css'


export default function GroupEvents() {

    const params = useParams()
    const history = useHistory()

    const dispatch = useDispatch()

    const events = useSelector(state => state.event.groupEvents)
    console.log("YO THESE R EVENTS FROM GROUP EVENTS", events)
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
            {
                events && Object.values(events).map((event) => {
                    const startDate = event.startDate.split('T').join(' · ')
                    return (<div
                        onClick={() => {
                            history.push(`/events/${event.id}`)
                        }}
                    className='group-events-card more-info'>
                        <div id='group-events-card-inner-info'>
                            <img src={event.previewImage} alt=''></img>
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
