import { csrfFetch } from "./csrf"

const GET_ALL_EVENTS = 'groups/getAllEvents'
const GET_GROUP_EVENTS = 'group/getGroupEvents'
const CREATE_EVENT = 'events/createEvent'
const GET_ONE_EVENT = 'events/getOneEvent'
const GET_EVENT_HOST = 'events/getHost'
const DELETE_EVENT = 'event/delete'
const POST_EVENT_IMAGE = 'event/addEventImage'

export const addEventImg = () => {
    return {
        type: POST_EVENT_IMAGE,
    }
}

export const deleteEvent = () => {
    return {
        type: DELETE_EVENT
    }
}

export const getHost = (attendances) => {
    return {
        type: GET_EVENT_HOST,
        payload: attendances
    }
}

export const getOneEvent = (event) => {
    return {
        type: GET_ONE_EVENT,
        payload: event
    }
}

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

export const postEventImg = (eventId, image) => async (dispatch) => {

    const res = await csrfFetch(`/api/events/${eventId}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    })

    const data = await res.json()
    if (data.errors) {
        return console.log(data.errors)
    }
    dispatch(addEventImg(data))
    return data
}

export const removeEvent = (eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data
}

export const getAttendances = (eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}/attendees`)
    const data = await res.json()
    let normal = {}
    if (data.errors) {
        return console.log(data.errors)
    }
        data.Attendees.map((attend) => {
            return normal[attend.id] = attend
        })
    dispatch(getHost(normal))
    return normal
}

export const loadEvent = (eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`)
    const data = await res.json()
    if (data.errors) {
        return console.log(data.errors)
    }
    if (res.ok) {

        dispatch(getOneEvent(data))
    }
    return data
}

export const requestNewEvent = (event, groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        body: JSON.stringify(event)
    })
    const data = await res.json()
    if (data.errors) {
        return console.log(data.errors)
    }

        dispatch(createEvent(data))


    return data
}

export const loadEvents = () => async (dispatch) => {

    const res = await csrfFetch('/api/events');
    const data = await res.json();
    if (res.ok) {
        let normal = {}
        data.map((event) => {
            return normal[event.id] = event
        })
        console.log(normal)
        dispatch(getAllEvents(normal));
    }

    return data;

}

export const loadGroupEvents = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${id}/events`)

    const data = await res.json()
    if (res.ok) {
        let normal = {}
        data.map((event) => {
            return normal[event.id] = event
        })
        dispatch(getGroupEvents(normal))
        console.log(normal)
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
            return newState
        case GET_ONE_EVENT:
            newState = {...state, eventInfo: action.payload}
            return newState
        case GET_EVENT_HOST:
            newState = {...state, eventAttend: {...Object.values(action.payload)}}
            return newState
        case POST_EVENT_IMAGE:
            newState = {...state, eventImg: action.payload}
            return newState
        default:
            return state
    }
}
