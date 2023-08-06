import { csrfFetch } from "./csrf"

const GET_ALL_MEMBERS = 'mambers/getAll'
const UPDATE_MEMBERSHIP = 'members/update'
const DELETE_MEMBER = '/member/delete'
const REQUEST_MEMBERSHIP = 'member/request'

const requestMember = (member) => {
    return {
        type: REQUEST_MEMBERSHIP,
        payload: member
    }
}

const removeMember = (memberId) => {
    return {
        type: DELETE_MEMBER,
        payload: memberId
    }
}

const loadMembers = (members) => {
    return {
        type: GET_ALL_MEMBERS,
        payload: members
    }
}

const updateMember = (newMember) => {
    return {
        type: UPDATE_MEMBERSHIP,
        payload: newMember
    }
}

export const requestMembership = () => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/membership`, {
        method: 'POST'
    })
    const data = await res.json()
    if (data && data.errors) return console.log(data)
    dispatch(requestMember(data))
    return data
}

export const deleteMember = (groupId, memberId) => async(dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'DELETE',
        body: JSON.stringify({memberId})
    })
    const data = await res.json()
    if (data && data.errors) {
        console.log(data.errors)
    }
    if (data.message = "Successfully deleted membership from group") {
        dispatch(removeMember(memberId))
    }
    return data
}

export const getAllMembers = (groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/members`)
    const data = await res.json()
    if (data && data.errors) {
        return console.log(data)
    }
    const newData = {}
    data["Members"].map(member => {
        return newData[member.id] = member
    })
    dispatch(loadMembers(newData))
    return newData

}

export const sendUpdate = (member, groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'PUT',
        body: JSON.stringify(member)
    })
    const data = await res.json()
    if (data && data.errors) {
        return console.log(data.errors)
    }
    dispatch(updateMember(data))
    return data
}


const initialState = {}

export const memberReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_ALL_MEMBERS:

            newState = {...state, members: action.payload}
            return newState
        case UPDATE_MEMBERSHIP:
            const members = {...state.members} //normalized obj
            const member = {...members[action.payload.memberId]} //member obj
            const membership = {...member.Membership}//membership obj
            membership.status = action.payload.status
            member.Membership = {...membership}
            members[action.payload.memberId] = {...member}
            newState = {...state, members: {...members}}
            return newState
        case DELETE_MEMBER:
            const newMembers = {...state.members}
                delete newMembers[action.payload.memberId]
                newState = {...state, members: {...newMembers}}
                return newState
        case REQUEST_MEMBERSHIP:
            newState = {...state, requestedMember: action.paylod}
        default:
            return state
    }
}
