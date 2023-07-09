import { useSelector, useDispatch } from "react-redux"
import * as groupEventsActions from '../../store/events'
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import './index.css'


export default function GroupEvents() {

    const params = useParams()


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
                    return (<div className='group-events-card more-info'>
                        <div id='group-events-card-inner-info'>
                            <img src={event.previewImage} alt=''></img>
                            <div id='group-events-card-info'>
                                <p>YYYY-MM-DD · time</p>
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
