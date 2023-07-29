import React, { useState, useEffect, useRef } from 'react'
import {useParams} from 'react-router-dom'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import * as placeActions from '../../store/venue';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'

const libraries = ['places']

export default function VenueFormModal() {
    const params = useParams()
    let groupId = window.location.pathname.split('/')
    groupId = Number(groupId[groupId.length - 1])

    const dispatch = useDispatch()

    const placeDetails = useSelector(state => state.venue.place)


    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const mapRef = useRef(null);

    const [position, setPosition] = useState({
        lat: 40.299493,
        lng: -101.950516
    })
    const [zoom, setZoom] = useState(3)
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({

    })
    useEffect(() => {

        geocoder.geocode({ location: position }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    const placeID = results[0].place_id;
                    dispatch(placeActions.fetchDetails(placeID))
                    // You can use the street address as needed.
                } else {
                    console.error("No results found");
                }
            } else {
                console.error("Geocoder failed due to: " + status);
            }

        });



    }, [position])

    useEffect(() => {
        if (placeDetails) {
            let info = ''
            let newAddress = ''
            Object.values(placeDetails).map((details) => {
                if (details.types.includes('administrative_area_level_1')) {
                    const newState = details.long_name
                    info += details.long_name + ', '
                    setState(newState)
                }
                if (details.types.includes('locality')) {
                    const newCity = details.long_name
                    info += details.long_name + ', '
                    console.log(details.long_name)
                    setCity(newCity)
                }
                if (details.types.includes('route')) {
                    newAddress += details.long_name
                    info += details.long_name + ', '
                }
                if (details.types.includes('street_number')) {
                    newAddress += details.long_name + ' '
                    info += details.long_name + ', '
                }
            })
            setAddress(newAddress)
        }
    }, [placeDetails])

    const containerStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '0px 0px 10px 10px',
        marginBottom: '0px'
    };

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: libraries,
    })

    const marker = () => {
        return (
            <Marker position={position}></Marker>
        )
    }

    const geocoder = new window.google.maps.Geocoder();

    const handleClick = (e) => {
        setPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        })
        console.log(position)

        if (zoom <= 15) {
            setZoom(19)
        }
        if (zoom <= 12) {
            setZoom(15)
        }
        if (zoom <= 9) {
            setZoom(12)
        }
        if (zoom <= 6) {
            setZoom(9)
        }
        if (zoom <= 3) {
            setZoom(6)
        }
        const currentZoom = mapRef.current.getZoom()
        setZoom(currentZoom)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {lat, lng} = position
        console.log({
            groupId: groupId, address, city, state, lat, lng
        })
        dispatch(placeActions.sendVenue({
            groupId: groupId, address, city, state, lat, lng
        }, groupId))
    }

    // console.log(document.getElementsByTagName('html'))


    return (
        <div id='venue-form-container'>
            <script
                defer
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
            ></script>
            <form
                id='venue-form'
                onSubmit={handleSubmit}
            >
                <div>
                    <h2
                        className='opacity'
                    >Enter the address of your Venue</h2>
                    <div>

                        <input
                        defaultValue='Address'
                        value={address}
                            className='opacity'
                            id='address-input'
                            onChange={(e) => {
                                    setAddress(e.target.value)

                                setValue(e.target.value)
                            }}
                            onClick={(e) => e.target.value = address}
                        />
                        <div id='results'>
                            {
                                status === 'OK' && data.map(location => {

                                    return <p onClick={(e) => {
                                        setAddress(e.target.value)
                                        clearSuggestions()
                                        const service = new window.google.maps.places.PlacesService(mapRef.current);
                                        service.getDetails({ placeId: location.place_id }, (result, status) => {
                                            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                                const location = result.geometry.location;
                                                const lat = location.lat();
                                                const lng = location.lng();
                                                let i = mapRef.current.getZoom()
                                                let time = 150
                                                console.log(time, i)
                                                if (i < 4) {
                                                    console.log(time, i)

                                                    let id = setInterval(() => {
                                                        if (i >= 4) {

                                                            console.log(i)
                                                            setPosition({ lat: lat, lng: lng })
                                                            let newId = setInterval(() => {
                                                                if (i >= 19) {
                                                                    clearInterval(newId)
                                                                }
                                                                setZoom(i++)
                                                            }, time)
                                                            clearInterval(id)
                                                        }
                                                        setZoom(i++)
                                                    }, time)


                                                    return

                                                }

                                                if (i > 4) {
                                                    console.log(time, i)

                                                    let id = setInterval(() => {
                                                        if (i <= 4) {

                                                            console.log(i)
                                                            setPosition({ lat: lat, lng: lng })
                                                            let newId = setInterval(() => {
                                                                if (i >= 19) {
                                                                    clearInterval(newId)
                                                                }
                                                                setZoom(i++)
                                                            }, time)
                                                            clearInterval(id)
                                                        }
                                                        setZoom(i--)
                                                    }, time)


                                                    return
                                                }

                                                if (i === 4) {
                                                    setPosition({ lat: lat, lng: lng })
                                                    let newId = setInterval(() => {
                                                        if (i >= 19) {
                                                            clearInterval(newId)
                                                        }
                                                        setZoom(i++)
                                                    }, time)
                                                    return
                                                }
                                            } else {
                                                console.error('Place details request failed:', status);
                                            }
                                        });
                                    }}
                                        value={location.description}
                                    >{location.description}</p>
                                })
                            }
                        </div>

                    </div>
                    <div>
                        <div>
                            <p
                                className='opacity'
                            >City</p>
                            <input
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value)
                                }}

                            />
                        </div>
                        <div>
                            <p
                                className='opacity'
                            >State</p>
                            <input
                                value={state}
                                onChange={(e) => {
                                    setState(e.target.value)
                                }}
                            />
                        </div>
                        <button
                            className='opacity'
                            id='venue-submit-button'
                            type='submit'>Create Venue</button>



                    </div>
                </div>

            </form>
            <div id='map'>
                {
                    isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={position}
                            zoom={zoom}

                            options={{

                                mapTypeId: 'hybrid',
                                scrollwheel: true,
                                mapTypeControlOptions: {
                                    style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                    position: window.google.maps.ControlPosition.LEFT_TOP,
                                },
                                fullscreenControlOptions: {
                                    position: window.google.maps.ControlPosition.RIGHT_TOP,
                                }
                            }}
                            onClick={(e) => handleClick(e)}
                            onLoad={(map) => mapRef.current = map}
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
    )
}
