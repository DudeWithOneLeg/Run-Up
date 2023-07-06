import { csrfFetch } from "./csrf"

const GET_ALL_GROUPS = 'groups/getAllGroups'
const GET_ONE_GROUP = 'groups/getOneGroup'
const CREATE_GROUP = '/groups/createGroup'

export const createGroup = (group) => {
    return {
        type: CREATE_GROUP,
        payload: group
    }
}

export const getAllGroups = (groups) => {
    return {
        type: GET_ALL_GROUPS,
        payload: groups
    }
}

export const getOneGroup = (group) => {
    return {
        type: GET_ONE_GROUP,
        payload: group
    }
}

export const requestNewGroup = (group) => async (dispatch) => {
    console.log("SENDING FETCH FOR NEW GROUP")
    const res = await csrfFetch('/api/groups/new', {
        method: 'POST',
        body: JSON.stringify(group)
    })
    let data
    if (res.ok) {
        data = await res.json()
        dispatch(createGroup(data))
    }
    return data
}

export const loadGroups = () => async (dispatch) => {

    console.log("FETCHING GROUPS");
    const res = await csrfFetch('/api/groups');
    let data;
    if (res.ok) {
        data = await res.json();
        let normal = {}
        for(let group of data.Groups) {
            normal[group.id] = group
        }
        console.log("LOAD GROUPS DATA", normal);
        dispatch(getAllGroups(normal));
    }

    return data;

}

export const loadGroup = (id) => async (dispatch) => {
    console.log("FETCHING GROUP")
    const res = await csrfFetch(`/api/groups/${id}`)
    const data = await res.json()
    dispatch(getOneGroup(data))

    return data
}
const initialState = {}

export const groupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_GROUPS:
            newState = { ...state, groups: {...Object.values(action.payload)} }
            return newState;
        case GET_ONE_GROUP:
            newState = { ...state, group: action.payload }
            return newState
        default:
            return state
    }
}
