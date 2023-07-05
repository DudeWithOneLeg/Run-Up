import { useDispatch, useSelector } from "react-redux"
import * as groupEventsActions from '../../store/groupEvents';
import { useEffect } from "react";
import './index.css'

export default function GroupEvents({ id }) {
    const dispatch = useDispatch()

    const events = useSelector(state => state.groupEvents.groupEvents)
    console.log(events)
    useEffect(() => {
       dispatch(groupEventsActions.loadGroupEvents(id))
    },[dispatch, id])


    return (
        <>
            {
                events && events.map((event) => {
                    <div className='card'>
                        <div id='img'>
                            <img src={event.previewImage} alt=''></img>
                        </div>
                        <div id='card-info'>
                            <h2>{event.startDate}</h2>
                            <h1>{event.name}</h1>
                        </div>
                        <div>
                            <p>{event.description}</p>
                        </div>
                    </div>

                })
            }
        </>
    )
}
