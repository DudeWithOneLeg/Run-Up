import { useParams, Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import * as groupActions from '../../store/groups'
import GroupEvents from "../GroupEvents"
import * as eventActions from '../../store/events';
import OpenModalButton from "../OpenModalButton";
import DeleteGroupModal from "../DeleteGroupModal"
import VenueFormModal from '../VenueFormModal'
import * as memberActions from '../../store/members'
import MembersModal from '../MembersModal'
import './index.css'


export default function GroupInfo() {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector(state => state.session.user)
    const oldMembers = useSelector(state => state.member.members)

    const members = {...oldMembers}

    useEffect(() => {
        dispatch(groupActions.loadGroup(params.id))
        dispatch(eventActions.loadGroupEvents(params.id)).catch(async (res) => {
            const data = await res.json()
            if (data && (data.errors || data.message)) {
                console.log(data)
                console.log(data.message)
            }
        })
        const groupId = params.id

    dispatch(memberActions.getAllMembers(groupId))

    }, [dispatch, params.id])
    const group = useSelector(state => state.group.group)
    const events = useSelector(state => state.event.groupEvents)


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
                            <p className="back-button">&lt;
                                <Link to='/groups/1/10'>Groups</Link></p>
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
                                        <p className='bold'>{group.city + "," + group.state}</p>
                                        {group.private ? <p className='bold'>{'(' + numEvents + ') Events'} · Private</p> : <p className='bold'>{'(' + numEvents + ') Events'} · Public</p>}
                                        <p className='bold'>Ogranized by {group.Organizer.firstName} {group.Organizer.lastName}</p>
                                    </div>
                                    <div id='organizer-buttons-container'>
                                        <button
                                            className="group-buttons"
                                            onClick={(e) => window.alert("Feature coming soon!")}
                                            hidden={!currentUser || members[currentUser.id]}
                                        >Join this group</button>
                                        <div
                                            hidden={!currentUser || currentUser.id !== group.organizerId}
                                            id='organizerButtons'
                                        >

                                            <button
                                                id='group-create-event-button'
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
                                                currentUser && currentUser.id === group.organizerId && <OpenModalButton
                                                        hidden={!currentUser || currentUser.id !== group.organizerId}
                                                        className="group-buttons"
                                                        buttonText="Delete"
                                                        modalComponent={<DeleteGroupModal />}
                                                    />
                                            }

                                            { ((currentUser && members[currentUser.id] ) || currentUser.id === group.organizerId) &&
                                                <OpenModalButton


                                                className=""
                                                buttonText="Members"
                                                modalComponent={<MembersModal members={members} currentUser={currentUser} organizerId={group.organizerId} groupId={params.id}/>}
                                            />
                                            }




                                        </div>

                                    </div>

                                </div>



                            </div>
                            <div className="more-info">
                                <h1>Organizer</h1>
                                <p className='bold'>{group.Organizer.firstName} {group.Organizer.lastName}</p>
                                <h1>What we're about</h1>
                                <p className='bold'>{group.about}</p>
                                <GroupEvents events={events} />
                            </div>

                        </div>
                    )
                }

            </div>

            
        </div>
    )
}
