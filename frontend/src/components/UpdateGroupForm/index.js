import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as groupActions from '../../store/groups'
import { useHistory, useParams } from "react-router-dom"

export default function UpdateGroupForm() {
    console.log("HELLOOO")

    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()

    //dispatch old group
    useEffect(() => {
        dispatch(groupActions.loadGroup(params.id))
    },[dispatch])

    const group = useSelector(state => state.group.group)
    const oldGroup = {}

    oldGroup.name = group.name
    oldGroup.about = group.about
    oldGroup.type = group.type
    oldGroup.private = group.private
    oldGroup.city = group.city
    oldGroup.state = group.state

    //set useState's to old group values for input defaultValues
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [about, setAbout] = useState('')
    const [onlineOrInperson, setOnlineOrInperson] = useState('')
    const [publicOrPrivate, setPublicOrPrivate] = useState("")

    //parse old group info public or private
    console.log("BEFORE RETURN PRIVATE", oldGroup)
    //oldGroup.private ? setPublicOrPrivate("Private") : setPublicOrPrivate("Public")

    //const [imgUrl, setImgUrl] = useState("")
    const [errors, setErrors] = useState({})

    //Log input values onChange
    useEffect(() => {
        console.log({
            name, location, about, onlineOrInperson, publicOrPrivate
        })
    },[name, location, about, onlineOrInperson, publicOrPrivate])

    const handleSumbit = (e) => {

        e.preventDefault()

        //parse public or private useState
        // if (publicOrPrivate === 'Private') {
        //     setPublicOrPrivate(true)
        // }
        // else {
        //     setPublicOrPrivate(false)
        // }

        console.log(publicOrPrivate)

        //parse location into (city, state)
        const [city, state] = location.split(', ')

        //form the new group object before sending fetch
        // delete oldGroup.GroupImages
        // delete oldGroup.Venues
        // delete oldGroup.organizerId
        // delete oldGroup.Organizer
        // delete oldGroup.numMmbers
        // delete oldGroup.updatedAt
        // delete oldGroup.createdAt



        //set new values if user entered new values, else set to old values
        if (name) {
            oldGroup.name = name
        }
        if (city) {
            oldGroup.city = city
        }
        if (state) {
            oldGroup.state = state
        }
        if (about) {
            oldGroup.about = about
        }
        if (onlineOrInperson) {
            oldGroup.type = onlineOrInperson
        }
        if (publicOrPrivate) {
            oldGroup.private = publicOrPrivate
        }

console.log("GROUP", group)
        console.log("OLDGROUP", oldGroup)

        console.log("FINAL GROUP PARSE",oldGroup)

        dispatch(groupActions.updateGroupDetails(oldGroup, group.id)).catch(async (res) => {

        const data = await res
        console.log(data)

        if (data && data.errors) {
          console.log(data.errors)
          return setErrors(data.errors);
        }
    })

        console.log("GROUP ID", group.id)
        //group.organizerId =
        history.push(`/groups/${group.id}`)


        // })
        //     const image = {
        //     url: imgUrl,
        //     preview: true
        // }
        // const id = groupState.id
        // if (id) {
        //     dispatch(groupActions.postImage(id, image))
        // }





    }

if (!oldGroup) {
    return null
}
const value = oldGroup.about
    return (
        <>
            <p>
                BECOME AN ORGNIZER
            </p>
            <h2>
                We'll walk you through a few steps to build your local community
            </h2>
            <form onSubmit={handleSumbit}>
                <h1>
                    First, set your group's location.
                </h1>
                <p>
                    Meetup groups meet locally, in person and online. We'll connect you with people
                    in your area, and more can join you online
                </p>
                <input
                defaultValue={`${oldGroup.city}, ${oldGroup.state}`}
                onChange={(e) => {
                    setLocation(e.target.value)
                }}
                >
                </input>
                <h1>
                    What will your group's name be?
                </h1>
                <p>
                    Choose a name that will give people a clear idea of what the group is about.
                    Feel free to get creative! You can edit this later if you change your mind.
                </p>
                <input
                defaultValue={oldGroup.name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                >
                </input>
                {
                    errors.name && <p>{errors.name}</p>
                }
                <h1>
                    Now describe what your group will be about
                </h1>
                <p>
                    People will see this when we promote your group, but you'll be able to add to it later, too.
                </p>
                <ol>
                    <li>
                        What's the purpose of the group?
                    </li>
                    <li>
                        Who should join?
                    </li>
                    <li>
                        What will you do at your events?
                    </li>
                </ol>
                <textarea
                value={value}
                onChange={(e) => {
                    setAbout(e.target.value)
                }}
                onClick={(e) => e.target.value = about}
                >
                Please write at least 30 characters
                </textarea>
                {
                    errors.about && <p>{errors.about}</p>
                }
                <h1>Final steps...</h1>
                <p>
                is this an in person or online group?
                </p>
                <select
                onSelect={(e) => {
                    setOnlineOrInperson(e.target.value)
                }}
                >
                    <option>In person</option>
                    <option>Online</option>
                </select>
                {
                    errors.type && <p>{errors.type}</p>
                }
                <p>
                Is this group private or public?
                </p>
                <select
                onChange={(e) => {
                    if (e.target.value === 'Private') {
                        setPublicOrPrivate(true)
                    }
                    else {
                        setPublicOrPrivate(false)
                    }

                }}
                >

                    <option selected={oldGroup.private}>Public</option>
                    <option selected={oldGroup.private}>Private</option>
                </select>
                {
                    errors.private && <p>{errors.private}</p>
                }
                {/* <p>
                    Please add an image url for your group below: HELLOOO
                </p>
                <input
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                >
                </input> */}
                <button
                type='submit'
                >Update group</button>
            </form>
        </>
    )
}
