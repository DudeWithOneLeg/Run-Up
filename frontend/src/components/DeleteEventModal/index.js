import { useModal } from "../../context/Modal";
import * as eventActions from '../../store/events'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './index.css'


export default function DeleteEventModal({eventId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const history = useHistory()

    const event = useSelector(state => state.event.event)

    return (
        <div id='delete-confirm'>
            <h3>
                Confirm Delete
            </h3>
            <p>Are you sure you want to remove this group?</p>
            <button
            id='confirm'
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(eventActions.removeEvent(eventId)).then(closeModal)
                    history.push('/events/1/10')

                }}
            >Yes &#40;Delete Event&#41;
            </button>
            <button
            id="deny"
            onClick={(e) => {
                e.preventDefault()
                closeModal()

            }}
            >No &#40;Keep Event&#41;</button>
        </div>
    )
}
