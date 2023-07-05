const GET_ALL_GROUPS = 'groups/getAllGroups'
const GET_ALL_EVENTS = 'groups/getAllEvents'
const GET_ONE_GROUP = 'groups/getOneGroup'
const GET_GROUP_EVENTS = 'group/getGroupEvents'

export const getAllGroups = (groups) => {
    return {
        type: GET_ALL_GROUPS,
        payload: groups
    }
}

export const getAllEvents = (events) => {
    return {
        type: GET_ALL_EVENTS,
        payload: events
    }
}

export const getOneGroup = (group) => {
    return {
        type: GET_ONE_GROUP,
        payload: group
    }
}
export const getGroupEvents = (events) => {
    return {
        type: GET_GROUP_EVENTS,
        payload: events
    }
}

export const loadGroups = () => async (dispatch) => {

    console.log("FETCHING GROUPS");
    const res = await fetch('/api/groups');
    let data;
    if (res.ok) {
        data = await res.json();
        console.log("LOAD GROUPS DATA", data);
        dispatch(getAllGroups(data.Groups));
    }

    return data;

}

export const loadGroup = (id) => async (dispatch) => {
    console.log("FETCHING GROUP")
    const res = await fetch(`/api/groups/${id}`)
    const data = await res.json()
    dispatch(getOneGroup(data))

    return data
}



export const loadEvents = () => async (dispatch) => {

    console.log("FETCHING EVENTS");
    const res = await fetch('/api/events');
    const data = await res.json();
    if (res.ok) {
        console.log("LOAD EVENTS DATA", data);
        dispatch(getAllEvents(data));
    }

    return data;

}

export const loadGroupEvents = (id) => async (dispatch) => {
    console.log("FETCHING GROUP EVENTS")
    const res = await fetch(`/api/groups/${id}/events`)
    const data = await res.json()
    if (res.ok) {
        console.log("LOAD GROUP EVENTS", data)
        dispatch(getGroupEvents(data))
    }
    return data
}


const initialState = {}

export const groupEventsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_GROUPS:
            newState = { ...state, groups: action.payload }
            return newState;
        case GET_ALL_EVENTS:
            newState = { ...state, events: action.payload }
            return newState
        case GET_ONE_GROUP:
            newState = { ...state, group: action.payload }
            return newState
        case GET_GROUP_EVENTS:
            newState = {...state, groupEvents: action.payload}
            return newState
        default:
            return state
    }
}
