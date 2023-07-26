import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as groupActions from '../../store/groups'
import { useHistory, useParams } from "react-router-dom"
import './index.css'

export default function UpdateGroupForm() {

    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()
    const user = useSelector(state => state.session.user)

    if (!user) {
        history.push('/')
    }

    //dispatch old group
    useEffect(() => {
        dispatch(groupActions.loadGroup(params.id))
    }, [dispatch])

    const group = useSelector(state => state.group.group)


    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [about, setAbout] = useState('')
    const [onlineOrInperson, setOnlineOrInperson] = useState('')
    const [publicOrPrivate, setPublicOrPrivate] = useState("")
    const [errors, setErrors] = useState({})

    useEffect(() => {
        console.log({
            name, location, about, onlineOrInperson, publicOrPrivate
        })
    }, [name, location, about, onlineOrInperson, publicOrPrivate])

    if (!group || !user) {
        return null
    }

    if (user.id !== group.Organizer.id) {
        history.push('/')
    }

    const oldGroup = {}

    oldGroup.name = group.name
    oldGroup.about = group.about
    oldGroup.type = group.type
    oldGroup.private = group.private
    oldGroup.city = group.city
    oldGroup.state = group.state

    //set useState's to old group values for input defaultValues




    //parse old group info public or private
    console.log("BEFORE RETURN ", oldGroup)
    //oldGroup.private ? setPublicOrPrivate("Private") : setPublicOrPrivate("Public")

    //const [imgUrl, setImgUrl] = useState("")


    //Log input values onChange


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

        console.log("FINAL GROUP PARSE", oldGroup)

        dispatch(groupActions.updateGroupDetails(oldGroup, group.id)).catch(async (res) => {

            const data = await res
            console.log(data)

            if (data && data.errors) {
                console.log(data.errors)
                return setErrors(data.errors);
            }
        })

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

    if (!oldGroup || !user) {
        return null
    }
    return (
        <div className="group-form-container">

            <form
                id="group-form"
                onSubmit={handleSumbit}>
                     <p>
                     UPDATE YOUR GROUP'S INFORMATION
            </p>
            <h2 id="group-h2">
                We'll walk you through a few steps to build your local community
            </h2>
                <div className='group-div'>
                    <h2>
                        First, set your group's location.
                    </h2>
                    <p>
                        Meetup groups meet locally, in person and online. We'll connect you with people
                        in your area, and more can join you online
                    </p>
                    <input

                        className='group-input'
                        defaultValue={`${oldGroup.city}, ${oldGroup.state}`}
                        onChange={(e) => {
                            setLocation(e.target.value)
                        }}
                    >
                    </input>
                </div>
                <div className="group-div">
                    <h2>
                        What will your group's name be?
                    </h2>
                    <p>
                        Choose a name that will give people a clear idea of what the group is about.
                        Feel free to get creative! You can edit this later if you change your mind.
                    </p>
                    <input
                        className='group-input'
                        defaultValue={oldGroup.name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    >
                    </input>
                    {
                        errors.name && <p className="errors">{errors.name}</p>
                    }
                </div>
                <div className="group-div">
                    <h2>
                        Now describe what your group will be about
                    </h2>
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
                        id='group-form-textarea'
                        defaultValue={oldGroup.about}
                        onChange={(e) => {
                            setAbout(e.target.value)
                        }}
                    >
                    </textarea>
                    {
                        errors.about && <p className="errors">{errors.about}</p>
                    }
                </div>



                <div className='group-div'>
                    <h2>Final steps...</h2>
                    <p>
                        is this an in person or online group?
                    </p>
                    <select
                        className="group-form-select group-input"
                        onSelect={(e) => {
                            setOnlineOrInperson(e.target.value)
                        }}
                    >

                        <option selected={oldGroup.type === 'In person'}>In person</option>
                        <option selected={oldGroup.type === 'Online'}>Online</option>
                    </select>
                    {
                        errors.type && <p className="errors">{errors.type}</p>
                    }
                    <p>
                        Is this group private or public?
                    </p>
                    <select
                    className="group-form-select group-input"
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
                        errors.private && <p className="errors">{errors.private}</p>
                    }
                </div>
                {/* <p>
                    Please add an image url for your group below: HELLOOO
                </p>
                <input
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                >
                </input> */}
                <button
                    id='group-button'
                    type='submit'
                >Update group</button>
            </form>
        </div>
    )
}
