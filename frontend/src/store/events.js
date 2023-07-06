import { csrfFetch } from "./csrf"

const GET_ALL_EVENTS = 'groups/getAllEvents'
const GET_GROUP_EVENTS = 'group/getGroupEvents'

export const getAllEvents = (events) => {
    return {
        type: GET_ALL_EVENTS,
        payload: events
    }
}

export const getGroupEvents = (events) => {
    return {
        type: GET_GROUP_EVENTS,
        payload: events
    }
}

export const loadEvents = () => async (dispatch) => {

    console.log("FETCHING EVENTS");
    const res = await csrfFetch('/api/events');
    const data = await res.json();
    if (res.ok) {
        let normal = {}
        data.map((event) => {
            return normal[event.id] = event
        })
        console.log("LOAD EVENTS DATA", normal);
        dispatch(getAllEvents(normal));
    }

    return data;

}

export const loadGroupEvents = (id) => async (dispatch) => {
    console.log("FETCHING GROUP EVENTS")
    const res = await csrfFetch(`/api/groups/${id}/events`)
    const data = await res.json()
    if (res.ok) {
        let normal = {}
        data.map((event) => {
            return normal[event.id] = event
        })
        console.log("LOAD GROUP EVENTS", normal)
        dispatch(getGroupEvents(normal))
    }
    return data
}


const initialState = {}

export const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_EVENTS:
            newState = { ...state, events: {...Object.values(action.payload)} }
            return newState
        case GET_GROUP_EVENTS:
            newState = {...state, groupEvents: {...Object.values(action.payload)}}
            return newState
        default:
            return state
    }
}
