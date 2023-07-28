import { csrfFetch } from "./csrf"

const GET_ALL_GROUPS = 'groups/getAllGroups'
const GET_ONE_GROUP = 'groups/getOneGroup'
const CREATE_GROUP = '/groups/createGroup'
const CREATE_GROUP_IMAGE = 'group/createGroupImage'
const UPDATE_GROUP = 'groups/updateGroup'
const DELETE_GROUP = 'groups/deleteGroup'

export const deleteGroup = (groupId) => {
    return {
        type: DELETE_GROUP,
        payload: groupId
    }
}

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

export const createGroupImage = (image) => {
    return {
        type: CREATE_GROUP_IMAGE,
        payload: image
    }
}

export const updateGroup = (group) => {
    return {
        type: UPDATE_GROUP,
        payload: group
    }
}

export const removeGroup = (groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}`, {
        method: "DELETE"
    })
    dispatch(deleteGroup(groupId))
    return res
}

export const updateGroupDetails = (group, groupId) => async (dispatch) => {
    const res = csrfFetch(`/api/groups/${groupId}`, {
        method: "PUT",
        body: JSON.stringify(group)
    })
    const data = await res.json()
    dispatch(updateGroup(data))
    return res
}

export const postImage = (groupId, image) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/images`, {
        method: "POST",
        body: JSON.stringify(image)
    })
    const data = await res.json()
    dispatch(createGroupImage(data))
    return res
}

export const requestNewGroup = (group) => async (dispatch) => {

    const res = await csrfFetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify(group)
    })
    const data = await res.json()
        console.log(data)
        dispatch(createGroup(data))

    return res
}

export const loadGroups = () => async (dispatch) => {

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
    const res = await csrfFetch(`/api/groups/${id}`)
    const data = await res.json()
    dispatch(getOneGroup(data))

    return res
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
            return newState;
        case CREATE_GROUP:
            newState = {...state, newGroup: action.payload}
            return newState
        case CREATE_GROUP_IMAGE:
            newState = {...state, newGroupImage: action.payload}
            return newState
        case UPDATE_GROUP:
            newState = {...state, updatedGroup: action.payload}
            return newState
        case DELETE_GROUP:
            newState = {...state}
            newState.group.group = {}
            console.log('AFTER DELETE', newState)
            return newState
        default:
            return state
    }
}
