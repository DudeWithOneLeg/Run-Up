import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as groupActions from '../../store/groups'
import { useHistory } from "react-router-dom"
import './index.css'

export default function GroupForm() {
    console.log("HELLOO")

    const history = useHistory()

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [about, setAbout] = useState("")
    const [onlineOrInperson, setOnlineOrInperson] = useState("In person")
    const [publicOrPrivate, setPublicOrPrivate] = useState("Public")
    const [imgUrl, setImgUrl] = useState("")
    const [errors, setErrors] = useState({})

    const groupState = useSelector((state) => state.group.newGroup)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log({
            name, location, about, onlineOrInperson, publicOrPrivate
        })
    },[name, location, about, onlineOrInperson, publicOrPrivate])

    const handleSumbit = (e) => {

        e.preventDefault()

        if (publicOrPrivate === 'Private') {
            setPublicOrPrivate(true)
        }
        else {
            setPublicOrPrivate(false)
        }

        console.log(publicOrPrivate)
        const [city, state] = location.split(', ')
        publicOrPrivate === 'Private' ? setPublicOrPrivate(true) : setPublicOrPrivate(false)

        const group = {name, city, state, about, type: onlineOrInperson, private: publicOrPrivate, }

        console.log("FINAL GROUP PARSE", group)

        dispatch(groupActions.requestNewGroup(group)).catch(async (res) => {

        const data = await res.json()
        if (data && data.errors) {
          console.log("DATA", data)
          return setErrors(data.errors);
        }

        console.log(groupState)

        })
            const image = {
            url: imgUrl,
            preview: true
        }

        if (groupState) {

            const id = groupState.id
            dispatch(groupActions.postImage(id, image))
            history.push(`/groups/${groupState.id}`)
        }

    }

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
                defaultValue="City, STATE"
                onChange={(e) => {
                    setLocation(e.target.value)
                }}
                >
                </input>
                {
                    (errors.city || errors.state) && <p className="errors">{errors.city} {errors.state}</p>
                }
                <h1>
                    What will your group's name be?
                </h1>
                <p>
                    Choose a name that will give people a clear idea of what the group is about.
                    Feel free to get creative! You can edit this later if you change your mind.
                </p>
                <input
                defaultValue="What is your group name?"
                onChange={(e) => {
                    setName(e.target.value)
                }}
                >
                </input>

                {
                    errors.name && <p className="errors">{errors.name}</p>
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
                onChange={(e) => {
                    setAbout(e.target.value)
                }}
                onClick={(e) => {
                    e.target.value = about
                }}
                >
                Please write at least 50 characters
                </textarea>
                {
                    errors.about && <p className="errors">{errors.about}</p>
                }
                <h1>Final steps...</h1>
                <p>
                is this an in person or online group?
                </p>
                <select
                defaultValue="(choose one)"
                onSelect={(e) => {
                    setOnlineOrInperson(e.target.value)
                }}
                >
                    <option>In person</option>
                    <option>Online</option>
                </select>
                {
                    errors.type && <p className="errors">{errors.type}</p>
                }
                <p>
                Is this group private or public? hellloooo
                </p>
                <select
                value='(choose one)'
                onChange={(e) => {
                    setPublicOrPrivate(e.target.value)
                }}
                >
                    <option value="" selected disabled hidden>Choose here</option>
                    <option>Public</option>
                    <option>Private</option>
                </select>
                {
                    errors.private && <p className="errors">{errors.private}</p>
                }
                <p>
                    Please add an image url for your group below:
                </p>
                <input
                onChange={(e) => {
                    const extensions = ['png', 'jpg', 'jpeg']
                    let urlExtension = e.target.value.split('.')
                    urlExtension = urlExtension[urlExtension.length - 1]
                    console.log(urlExtension)

                    if (!extensions.includes(urlExtension)) {
                        console.log(!extensions.includes(urlExtension))
                        return setErrors({imgUrl: "Image URL must end in .png, .jpg, or .jpeg"})
                    }
                    else {
                        setErrors({})
                    }
                    setImgUrl(e.target.value)
                }}
                >
                </input>
                {
                    errors.imgUrl && <p className='errors'>{errors.imgUrl}</p>
                }
                <button
                type='submit'

                >Create group</button>
            </form>
        </>
    )
}
