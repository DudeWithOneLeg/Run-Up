import { useState } from 'react'

export default function Member({member, currentUser, members, organizerId}) {
    const [edit, setEdit] = useState(false)
    const [status, setStatus] = useState('')

    return (
        <div className='member-div'>
                        <p className="member-name">{member.firstName} {member.lastName}</p>
                        <div className='member-status-div'>
                            {
                                (!currentUser ||
                                    members[currentUser.id].Membership.status === 'co-host' ||
                                    currentUser.id === organizerId) &&
                                <div>
                                    <p
                                        className='member-edit'
                                        onClick={() => setEdit(!edit)}
                                        hidden={edit}
                                    >
                                        Edit
                                    </p>
                                    <button
                                    hidden={!edit}

                                    >
                                        Save
                                    </button>
                                </div>

                            }


                            {
                                !edit && member.Membership.status === 'member' && <p>
                                    Member

                                </p>
                            }
                            {
                                !edit && member.Membership.status === 'co-host' && <p>
                                    Co-host

                                </p>
                            }
                            {
                                !edit && member.Membership.status === 'pending' && <p>
                                    Pending

                                </p>
                            }
                            {
                                edit && <select
                                    id='status-select'
                                    onSelect={(e) => {
                                        if (e.target.value === 'Member') setStatus('member')
                                        if (e.target.value === 'Co-host') setStatus('co-host')

                                    }}
                                >
                                    <option selected={member.Membership.status === 'member'}>Member</option>
                                    <option selected={member.Membership.status === 'co-host'}>Co-host</option>
                                </select>
                            }
                        </div>
                    </div>
    )
}
