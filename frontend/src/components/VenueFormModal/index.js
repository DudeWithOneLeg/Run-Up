import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import * as placeActions from '../../store/venue';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'



export default function VenueFormModal() {
    const dispatch = useDispatch()

    const placeDetails = useSelector(state => state.venue.place)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [location, setLocation] = useState('')
    const [position, setPosition] = useState({})
    const [zoom, setZoom] = useState(3)
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            radius: 1000 * 1000
        }
    })
    const newDetails = {...placeDetails};
    const newPosition = {...position}





    // useEffect(() => {

    //         geocoder.geocode({ location: newPosition }, (results, status) => {
    //     if (status === "OK") {
    //         if (results[0]) {
    //             streetAddress = results[0].place_id;

    //             console.log("Place ID", streetAddress);
    //             dispatch(placeActions.fetchDetails(streetAddress))
    //             // You can use the street address as needed.
    //         } else {
    //             console.error("No results found");
    //         }
    //     } else {
    //         console.error("Geocoder failed due to: " + status);
    //     }
    // });


    // if (Object.values(newDetails).length) {
    //     Object.values(newDetails).map((details) => {
    //         if (details.types.includes('administrative_area_level_1')) setState(details.long_name)
    //         if (details.types.includes('locality')) setCity(details.long_name)
    //         if (details.types.includes('route')) setAddress(details.long_name)
    //     })
    // }


    // }, [newPosition])

    const containerStyle = {
        width: '400px',
        height: '400px',
        borderRadius: '10px',
        marginTop: '20px'
    };

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBiC-knCF8B1sha04loDyGfM3sM_yaC93U',
        libraries: ['places'],
    })

    const marker = () => {
        return (
            <Marker position={position}></Marker>
        )
    }

    const geocoder = new window.google.maps.Geocoder();

    let streetAddress



    //   useEffect(() => {
    //     const response = dispatch(fetchDetails(streetAddress))

    //   },[streetAddress])



    return (
        <div id='venue-form-container'>
            {/* <script
                            defer
                            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
                        ></script> */}
            <form>
                <h2>Enter the address of your Venue</h2>
                <div>
                    <p>Address</p>
                    <input
                    value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    />
                    <div id='results'>
                        {
                            status === 'OK' && data.map(location => {
                                console.log(data)
                                return <p>{location.description}</p>
                            })
                        }
                    </div>

                </div>
                <div>
                    <div>
                        <p>City</p>
                        <input
                        value={city}
                            onChange={(e) => {
                                setCity(e.target.value)
                            }}

                        />
                    </div>
                    <div>
                        <p>State</p>
                        <input
                        value={state}
                            onChange={(e) => {
                                setState(e.target.value)
                            }}
                        />
                    </div>
                    <div id='map'>
                        {
                            isLoaded ? (
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={{
                                        lat: 40.299493,
                                        lng: -101.950516
                                    }}
                                    zoom={zoom}
                                    options={{
                                        mapTypeId: 'hybrid'
                                    }}
                                    onClick={(e) => {
                                        setPosition({
                                            lat: e.latLng.lat(),
                                            lng: e.latLng.lng()
                                        })
                                        geocoder.geocode({ location: newPosition }, (results, status) => {
                                            if (status === "OK") {
                                                if (results[0]) {
                                                    streetAddress = results[0].place_id;

                                                    console.log("Place ID", streetAddress);
                                                    dispatch(placeActions.fetchDetails(streetAddress))
                                                    // You can use the street address as needed.
                                                } else {
                                                    console.error("No results found");
                                                }
                                            } else {
                                                console.error("Geocoder failed due to: " + status);
                                            }
                                        });


                                        if (Object.values(newDetails).length) {
                                            Object.values(newDetails).map((details) => {
                                                if (details.types.includes('administrative_area_level_1')) setState(details.long_name)
                                                if (details.types.includes('locality')) setCity(details.long_name)
                                                if (details.types.includes('route')) setAddress(details.long_name)
                                            })
                                        }
                                    }}
                                >
                                    { /* Child components, such as markers, info windows, etc. */}
                                    {
                                        position.lat && marker()
                                    }
                                </GoogleMap>

                            ) : <></>
                        }
                    </div>


                </div>
            </form>
        </div>
    )
}
