import { csrfFetch } from "./csrf"

const GET_ALL_EVENTS = 'groups/getAllEvents'
const GET_GROUP_EVENTS = 'group/getGroupEvents'
const CREATE_EVENT = 'events/createEvent'

export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: event
    }
}

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

export const requestNewEvent = (event, groupId) => async (dispatch) => {
    console.log("SENDING FETCH FOR NEW EVENT")
    const res = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        body: JSON.stringify(event)
    })
    const data = await res.json()
    if (res.ok) {
        dispatch(createEvent(data))
    }

    return res
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
        case CREATE_EVENT:
            newState = {...state, event: action.payload}
        default:
            return state
    }
}
