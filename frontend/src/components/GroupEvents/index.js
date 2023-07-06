import { useDispatch, useSelector } from "react-redux"
import * as groupEventsActions from '../../store/events';
import { useEffect } from "react";
import './index.css'
import { useParams } from "react-router-dom";

export default function GroupEvents() {
    const dispatch = useDispatch()
    const id = useParams().id

    const events = useSelector(state => state.event.groupEvents)
    console.log("YO THESE R EVENTS", events)
    useEffect(() => {
       dispatch(groupEventsActions.loadGroupEvents(id))
    },[dispatch, id])

console.log(Object.values(events))
    return (
        <>
            {
                events && Object.values(events).map((event) => {
                    return (<div className='card'>
                        <div id='img'>
                            <img src={event.previewImage} alt=''></img>
                        </div>
                        <div id='card-info'>
                            <h2>{event.startDate}</h2>
                            <h1>{event.name}</h1>
                        </div>
                        <div className='about'>
                            <p>{event.description}</p>
                        </div>
                    </div>)

                })
            }
        </>
    )
}
