import { csrfFetch } from "./csrf"

const GET_ALL_EVENTS = 'groups/getAllEvents'
const GET_GROUP_EVENTS = 'group/getGroupEvents'
const CREATE_EVENT = 'events/createEvent'
const GET_ONE_EVENT = 'events/getOneEvent'
const GET_EVENT_HOST = 'events/getHost'
const DELETE_EVENT = 'event/delete'
const POST_EVENT_IMAGE = 'event/addEventImage'
const UPDATE_EVENT = 'event/update'

const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: event
    }
}

const addEventImg = () => {
    return {
        type: POST_EVENT_IMAGE,
    }
}

const deleteEvent = () => {
    return {
        type: DELETE_EVENT
    }
}

const getHost = (attendances) => {
    return {
        type: GET_EVENT_HOST,
        payload: attendances
    }
}

const getOneEvent = (event) => {
    return {
        type: GET_ONE_EVENT,
        payload: event
    }
}

const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: event
    }
}

const getAllEvents = (events) => {
    return {
        type: GET_ALL_EVENTS,
        payload: events
    }
}

const getGroupEvents = (events) => {
    return {
        type: GET_GROUP_EVENTS,
        payload: events
    }
}

export const createNewEvent = (event, eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify(event)
    })
    const data = await res.json()
    dispatch(updateEvent(data))
    return data
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

export const requestUpdateEvent = (event, eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify(event)
    })
console.log(res)
    const data = await res.json()
    console.log(data)
    if (data && data.errors) return console.log('yo')


        dispatch(createEvent(data))

    return res
}

export const loadEvents = () => async (dispatch) => {

    const res = await csrfFetch('/api/events');
    const data = await res.json();
    if (res.ok) {
        let normal = {}
        data.map((event) => {
            return normal[event.id] = event
        })
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
