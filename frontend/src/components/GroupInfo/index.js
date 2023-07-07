import { useParams, Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import * as groupActions from '../../store/groups'
import GroupEvents from "../GroupEvents"
import * as eventActions from '../../store/events';
import './index.css'


export default function GroupInfo() {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(groupActions.loadGroup(params.id))
        dispatch(eventActions.loadGroupEvents(params.id)).catch( async (res) => {
            const data = await res.json()
            if (data && (data.errors || data.message)) {
                console.log(data)
                console.log(data.message)
            }
           })

    }, [dispatch, params.id])
    const group = useSelector(state => state.group.group)
    const events = useSelector(state => state.event.groupEvents)

    console.log("CURRENT GROUP" ,group)

    let numEvents = 0

    if (events) {
        numEvents = Object.values(events).length
    }

    if (!group) {
        return null
    }

    return (
        <>
            {
                group && (
                    <div>
                        <p>&lt;<Link to='/groups'>Groups</Link></p>
                        <div>
                            {group.GroupImages && group.GroupImages.map((img) => {
                                if (img.preview) {
                                    return (
                                    <img src={img.url} alt='placeholder'></img>
                                    )
                                }
                                return
                            })}
                            <h1>{group.name}</h1>
                            <p>{group.city + "," + group.state}</p>
                            {group.private ? <p>{numEvents} · Private</p> : <p>{numEvents} · Public</p>}
                            <p>Ogranized by </p>
                            <button
                            hidden={!currentUser || currentUser.id === group.organizerId}
                            >Join this group</button>
                            <div
                            hidden={currentUser && currentUser.id !== group.organizerId}
                            >
                                <button
                                hidden={!currentUser || currentUser.id !== group.organizerId}
                                >Create Event</button>
                                <button
                                hidden={!currentUser || currentUser.id !== group.organizerId}
                                onClick={() => history.push(`/groups/${group.id}/edit`)}
                                >Update</button>
                                <button
                                hidden={!currentUser || currentUser.id !== group.organizerId}
                                onClick={() => {
                                    dispatch(groupActions.removeGroup(group.id))
                                    history.push('/groups')
                                }}>Delete</button>
                            </div>
                            <h1>What we're about</h1>
                            <p>{group.about}</p>
                            <p>{group.previewImage}</p>
                            <h1>Upcoming Events</h1>
                        </div>
                        <GroupEvents events={events}/>
                    </div>

                )
            }

        </>
    )
}
