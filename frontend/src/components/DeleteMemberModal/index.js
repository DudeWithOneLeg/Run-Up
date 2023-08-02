import { useModal } from "../../context/Modal";
import * as memberActions from '../../store/members'
import { useDispatch, useSelector } from "react-redux";


export default function DeleteMemberModal({memberId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    return (
        <div id='delete-confirm'>
            <h3>
                Confirm Delete
            </h3>
            <p>Are you sure you want to remove this member?</p>
            <button
            id='confirm'
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(memberActions.deleteMember(memberId))

                }}
            >Yes &#40;Delete Member&#41;
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
