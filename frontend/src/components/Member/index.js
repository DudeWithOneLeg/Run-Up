import { useEffect, useState } from 'react'
import * as memberActions from '../../store/members'
import {useDispatch} from 'react-redux'
import OpenModalImage from '../OpenModalImage'
import DeleteMemberModal from '../DeleteMemberModal'

export default function Member({member, currentUser, groupId, organizerId, members, deleted, setDeleted}) {
    const [edit, setEdit] = useState(false)
    const [status, setStatus] = useState(member.Membership.status)
    const dispatch = useDispatch()


    const handleUpdate = () => {
        const newMember = {
            memberId: member.id,
            status
        }
        dispatch(memberActions.sendUpdate(newMember, groupId))
        setEdit(false)
    }

    return (
        <div className='member-div'>
                        <h3 className="member-name">{member.firstName} {member.lastName}</h3>
                        <div className='member-status-div'>
                            <p hidden={!deleted.includes(member.id)}>Removed</p>
                            {
                                (!currentUser ||
                                    members[currentUser.id].Membership.status === 'co-host' ||
                                    currentUser.id === organizerId) && !deleted.includes(member.id) &&
                                <div hidden={member.id === organizerId}>
                                    <p
                                        className='member-edit'
                                        onClick={() => {
                                            setEdit(!edit)
                                            if (member.Membership.status === 'pending') {
                                                setStatus('member')
                                            }
                                            }
                                        }
                                        hidden={edit}
                                    >
                                        Edit
                                    </p>
                                    <button
                                    className='save-status-button'
                                    hidden={!edit}
                                    onClick={handleUpdate}
                                    >
                                        Save
                                    </button>
                                    <button
                                    className='save-status-button'
                                    hidden={!edit}
                                    onClick={() => setEdit(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            }
                            <div hidden={member.id === organizerId || deleted.includes(member.id)}>
                                {
                                !edit && status === 'member' && <p>
                                    Member

                                </p>
                            }
                            {
                                !edit && status === 'co-host' && <p>
                                    Co-host

                                </p>
                            }
                            {
                                !edit && status === 'pending' && <p>
                                    Pending

                                </p>
                            }
                            </div>

                            {
                                member.id === organizerId && <p>Organizer</p>
                            }


                            {
                                edit && <select
                                    className='status-select'
                                    onChange={(e) => {
                                        if (e.target.value === 'Member') {
                                            setStatus('member')
                                        }
                                        if (e.target.value === 'Co-host') {
                                            setStatus('co-host')
                                        }

                                    }}
                                >
                                    <option
                                    selected={member.Membership.status === 'member'}
                                    value='Member'
                                    >Member</option>
                                    <option
                                    value='Co-host'
                                    selected={member.Membership.status === 'co-host'}
                                    >Co-host</option>
                                </select>

                            }
                            {
                                edit && <OpenModalImage
                                className="group-buttons"
                                buttonText="Delete"
                                imgsrc='/images/trash.png'
                                modalComponent={<DeleteMemberModal memberId={member.id} members={members} currentUser={currentUser} organizerId={organizerId} groupId={groupId} setDeleted={setDeleted}/>}
                            />
                            }
                        </div>
                    </div>
    )
}
