import { useSelector } from "react-redux"
import './index.css'


export default function GroupEvents({events}) {

    //const events = useSelector(state => state.event.groupEvents)
    console.log("YO THESE R EVENTS FROM GROUP EVENTS", events)
    // useEffect(() => {
    //    dispatch(groupEventsActions.loadGroupEvents(id)).catch( async (res) => {
    //     const data = await res.json()
    //     if (data && data.errors) {
    //         console.log(data)
    //     }
    //    })
    // },[dispatch, id])

//console.log("GROUP EVENTS OBJECT VALUES LENGTH", Object.values(events).length)
    return (
        <>
            {
                events && Object.values(events).map((event) => {
                    return (<div className='card'>
                        <div id='img'>
                            {/* <img src={event.previewImage} alt=''></img> */}
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
