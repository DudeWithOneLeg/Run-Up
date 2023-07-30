import { csrfFetch } from "./csrf"

const GET_PLACE_DETAILS = 'venues/getDetails'
const CREATE_VENUE = 'venue/create'

const createVenue = (venue) => {
    return {
        type: CREATE_VENUE,
        payload: venue
    }
}

const loadDetails = (placeDetails) => {
    return {
        type: GET_PLACE_DETAILS,
        payload: placeDetails
    }
}

export const sendVenue = (venue, groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/venues`, {
        method: 'POST',
        body: JSON.stringify(venue)
    })
    const data = await res.json()
    if (data.errors) {
        return console.log(data.errors)
    }
    dispatch(createVenue(data))
}

export const fetchDetails = (placeId) => async (dispatch)  =>{

let res

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

fetch(`https://proxy.cors.sh/${url}`, {
    headers: {
        'x-cors-api-key': process.env.REACT_APP_CORS_API_KEY
    }
})

  .then((response) => response.json())
  .then((data) => {
    let string = ''
    console.log(data)
    data.result.address_components.map(locate => {
        return string += locate.long_name + ', '
    }); // Now you can access the data
    dispatch(loadDetails(data.result.address_components))
    res = data.result.address_components
    return data.result.address_components
  })
  .catch((error) => {
    console.error('Error fetching data:', error);

  });
return res
}

const initialState = {}

export const venueReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PLACE_DETAILS:
            const obj = {}
            let id = 0
            action.payload.map(detail => {
                obj[id++] = detail
            })
            newState = { ...state, place: {...obj} }
            return newState;
        case CREATE_VENUE:
            newState = {...state, newVenue: {...action.payload}}
            return newState
        default:
            return state
    }
}
