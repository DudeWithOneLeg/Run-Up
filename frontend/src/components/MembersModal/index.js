
import Member from '../Member'
import './index.css'

export default function Members({ members, currentUser, organizerId }) {

    return (
        <div id='member-component'>
            {
                Object.values(members).length && Object.values(members).map(member => {
                    return <Member member={member} currentUser={currentUser} members={members} organizerId={organizerId}/>
                })
            }
        </div>
    )
}
