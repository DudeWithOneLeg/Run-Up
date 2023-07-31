import { csrfFetch } from "./csrf"

const GET_ALL_MEMBERS = 'mambers/getAll'

const loadMembers = (members) => {
    return {
        type: GET_ALL_MEMBERS,
        payload: members
    }
}

export const getAllMembers = (groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/members`)
    const data = await res.json()
    if (data && data.errors) {
        return console.log(data)
    }
    dispatch(loadMembers(data))
    return res

}

const initialState = {}

export const memberReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_ALL_MEMBERS:
            const newData = {}
            action.payload["Members"].map(member => {
                return newData[member.id] = member
            })
            newState = {...state, members: newData}
            return newState
        default:
            return state
    }
}
