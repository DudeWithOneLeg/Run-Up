
import Member from '../Member'
import './index.css'

export default function Members({ members, currentUser, organizerId, groupId, deleted }) {
deleted ? deleted = deleted : deleted = []
    return (
        <div id='member-component'>
            {
                Object.values(members) && Object.values(members).map(member => {
                    console.log(members)
                    return <Member groupId={groupId} currentUser={currentUser} member={member} organizerId={organizerId} members={members} deleted={deleted}/>
                })
            }
        </div>
    )
}
