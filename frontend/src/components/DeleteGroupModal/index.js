import { useModal } from "../../context/Modal";
import * as groupActions from '../../store/groups'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './index.css'


export default function DeleteGroupModal() {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const history = useHistory()

    const group = useSelector(state => state.group.group)

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
                    dispatch(groupActions.removeGroup(group.id)).then(closeModal)
                    history.push('/groups')

                }}
            >Yes &#40;Delete Group&#41;
            </button>
            <button
            id="deny"
            onClick={(e) => {
                e.preventDefault()
                closeModal()

            }}
            >No &#40;Keep Group&#41;</button>
        </div>
    )
}
