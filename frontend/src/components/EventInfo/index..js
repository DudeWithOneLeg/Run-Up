import { useSelector, useDispatch } from "react-redux"
import * as eventActions from '../../store/events'
import { useEffect } from "react"



export default function EventInfo({eventId}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(eventActions.loadEvent(eventId))
    })
    return (
        <div>
            <p>&lt;<Link to='/events'>Events</Link></p>
            <h1>{}</h1>
        </div>
    )
}
