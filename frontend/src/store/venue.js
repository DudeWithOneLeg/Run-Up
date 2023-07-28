

const GET_PLACE_DETAILS = 'venues/getDetails'

const loadDetails = (placeDetails) => {
    return {
        type: GET_PLACE_DETAILS,
        payload: placeDetails
    }
}

export const fetchDetails = (placeId) => async (dispatch)  =>{


    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyBiC-knCF8B1sha04loDyGfM3sM_yaC93U`;

    // Fetch place details without mode: 'no-cors'
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

fetch(`https://proxy.cors.sh/${url}`, {
    headers: {
        'x-cors-api-key': 'temp_8594bdb8f6cc0c8f36fbb3e15a3f8134'
    }
})
  .then((response) => response.json())
  .then((data) => {
    let string = ''
    data.result.address_components.map(locate => {
        return string += locate.long_name + ', '
    })
    console.log(string, data.result.address_components); // Now you can access the data
    dispatch(loadDetails(data.result.address_components))
    return data.result.address_components
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

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

        default:
            return state
    }
}
