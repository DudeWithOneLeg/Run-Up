import { useParams, Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import * as groupActions from '../../store/groups'
import GroupEvents from "../GroupEvents"
import * as eventActions from '../../store/events';
import OpenModalButton from "../OpenModalButton";
import DeleteGroupModal from "../DeleteGroupModal"
import './index.css'


export default function GroupInfo() {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(groupActions.loadGroup(params.id))
        dispatch(eventActions.loadGroupEvents(params.id)).catch(async (res) => {
            const data = await res.json()
            if (data && (data.errors || data.message)) {
                console.log(data)
                console.log(data.message)
            }
        })

    }, [dispatch, params.id])
    const group = useSelector(state => state.group.group)
    const events = useSelector(state => state.event.groupEvents)

    console.log("CURRENT GROUP", group)

    let numEvents = 0

    if (events) {
        numEvents = Object.values(events).length
    }

    if (!group) {
        return null
    }

    return (
        <div id='group-info-container'>
            <div id='group-info'>
                {
                    group && (
                        <div id='group-info-div'>
                            <p>&lt;<Link to='/groups/1/10'>Groups</Link></p>
                            <div id='top-card'>
                                {group.GroupImages && group.GroupImages.map((img) => {
                                    if (img.preview) {
                                        return (
                                            <img src={img.url} alt='placeholder' id='group-image'></img>
                                        )
                                    }
                                    return
                                })}
                                <div id="top-right-card">
                                    <div id='top-right-card-info'>
                                        <h1>{group.name}</h1>
                                        <p>{group.city + "," + group.state}</p>
                                        {group.private ? <p>{'(' + numEvents + ') Events'} · Private</p> : <p>{'(' + numEvents + ') Events'} · Public</p>}
                                        <p>Ogranized by {group.Organizer.firstName} {group.Organizer.lastName}</p>
                                    </div>
                                    <button
                                    className="group-buttons"
                                    onClick={(e) => window.alert("Feature coming soon!")}
                                        hidden={!currentUser || currentUser.id === group.organizerId}
                                    >Join this group</button>
                                    <div
                                        hidden={!currentUser || currentUser.id !== group.organizerId}
                                        id='organizerButtons'
                                    >

                                        <button
                                        className="group-buttons"
                                            hidden={!currentUser || currentUser.id !== group.organizerId}
                                            onClick={() => history.push(`/groups/${group.id}/events/new`)}
                                        >Create Event</button>
                                        <button
                                        className="group-buttons"
                                            hidden={!currentUser || currentUser.id !== group.organizerId}
                                            onClick={() => history.push(`/groups/${group.id}/edit`)}
                                        >Update</button>
                                        {/* <button
                                            hidden={!currentUser || currentUser.id !== group.organizerId}
                                            onClick={() => {

                                                dispatch(groupActions.removeGroup(group.id))
                                                history.push('/groups')


                                            }}>Delete</button> */}
                                        {
                                            currentUser && currentUser.id === group.organizerId && <div
                                        id='delete'
                                        >
                                            <OpenModalButton

                                        className="group-buttons"
                                                buttonText="Delete"
                                                modalComponent={<DeleteGroupModal />}
                                            />
                                        </div>
                                        }


                                    </div>

                                </div>



                            </div>
                            <div className="more-info">
                                <h1>Organizer</h1>
                                <p>{group.Organizer.firstName} {group.Organizer.lastName}</p>
                                <h1>What we're about</h1>
                                <p>{group.about}</p>
                                <p>{group.previewImage}</p>
                                <h1>Events </h1>
                            </div>

                        </div>
                    )
                }
                <GroupEvents events={events} />
            </div>


        </div>
    )
}
