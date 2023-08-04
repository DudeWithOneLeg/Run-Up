import { useModal } from "../../context/Modal";
import * as memberActions from '../../store/members'
import { useDispatch } from "react-redux";
import { useState } from "react";
import MembersModal from '../MembersModal'


export default function DeleteMemberModal({ groupId, memberId, members, currentUser, organizerId}) {
    const dispatch = useDispatch()
    const [deleted, setDeleted] = useState([])
    const { closeModal, setModalContent } = useModal();

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
                    dispatch(memberActions.deleteMember(groupId, memberId))
                    const newDeleted = deleted.push(memberId)
                    setDeleted(newDeleted)
                    closeModal()
                    setModalContent(MembersModal({ groupId, memberId, members, currentUser, organizerId, deleted }))

                }}
            >Yes &#40;Delete Member&#41;
            </button>

            <button
            id="deny"
            onClick={(e) => {
                e.preventDefault()
                setDeleted(true)
                closeModal()
                setModalContent(MembersModal({ groupId, memberId, members, currentUser, organizerId, setDeleted }))
            }}
            >No &#40;Keep Member&#41;</button>
        </div>
    )
}
