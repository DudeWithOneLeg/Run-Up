import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import * as groupActions from '../../store/groups'
import GroupEvents from "../GroupEvents"


export default function GroupInfo() {
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(groupActions.loadGroup(params.id))

    }, [dispatch, params.id])
    const group = useSelector(state => state.group.group)
    return (
        <>
            {
                group && (
                    <div>
                        <div>
                            {group.GroupImages.map((img) => {
                                if (img.preview) {
                                    return <img alt='placeholder'></img>
                                }
                                return 
                            })}
                            <h1>{group.name}</h1>
                            <p>{group.city + "," + group.state}</p>
                            {group.private ? <p>Private</p> : <p>Public</p>}
                            <p>Ogranized by </p>
                            <h1>What we're about</h1>
                            <p>{group.about}</p>
                            <p>{group.previewImage}</p>
                            <h1>Upcoming Events</h1>
                        </div>
                        <GroupEvents />
                    </div>

                )
            }

        </>
    )
}
