import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import * as venueActions from '../../store/venue'
import Venue from "../Venue"
import './index.css'

export default function VenueListModal({groupId}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(venueActions.getGroupVenues(groupId))
    }, [dispatch])

    const oldVenues = useSelector(state => state.venue.groupVenues)
    const venues = {...oldVenues}

    const containerStyle = {
        width: '100%',
        height: '50%',
        borderRadius: '0px 0px 10px 10px',
        marginBottom: '0px',
        marginTop: '60px',
    }

    const mapOptions = {
        mapTypeId: 'hybrid',
        scrollwheel: false,
        draggable: false,
    }

    if (!venues) return null

    return (
        <div id='group-venues-container'>
            {
                Object.values(venues).map(venue => {
                    return <Venue address={venue.address} city={venue.city} state={venue.state} coord={{lat: venue.lat, lng: venue.lng}} stylingId='group-venues' containerStyle={containerStyle} mapOptions={mapOptions}/>
                })
            }
        </div>
    )
}
