import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import * as venueActions from '../../store/venue'
import Venue from "../Venue"

export default function VenueListModal({groupId}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(venueActions.getGroupVenues(groupId))
    }, [dispatch])

    const oldVenues = useSelector(state => state.venue.groupVenues)
    const venues = {...oldVenues}

    if (!venues) return null

    return (
        <div id='group-venues-container'>
            {
                Object.values(venues).map(venue => {
                    return <Venue address={venue.address} city={venue.city} state={venue.state} coord={{lat: venue.lat, lng: venue.lng}}/>
                })
            }
        </div>
    )
}
