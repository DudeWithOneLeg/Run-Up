import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as groupActions from '../../store/groups'

export default function GroupForm() {

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [about, setAbout] = useState("")
    const [onlineOrInperson, setOnlineOrInperson] = useState("(choose one)")
    const [publicOrPrivate, setPublicOrPrivate] = useState("(choose one)")

    const dispatch = useDispatch()

    useEffect(() => {
        console.log({
            name, location, about, onlineOrInperson, publicOrPrivate
        })
    },[name, location, about, onlineOrInperson, publicOrPrivate])

    const handleSumbit = (e) => {
        const group = {name, location, about, onlineOrInperson, publicOrPrivate}
        e.preventDefault()
        dispatch(groupActions.requestNewGroup(group))
    }

    return (
        <>
            <p>
                BECOME AN ORGNIZER
            </p>
            <h2>
                We'll walk you through a few steps to build your local community
            </h2>
            <form>
                <h1>
                    First, set your group's location.
                </h1>
                <p>
                    Meetup groups meet locally, in person and online. We'll connect you with people
                    in your area, and more can join you online
                </p>
                <input
                value={location}
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
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                >
                </input>
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
                Please write at least 30 characters
                </textarea>
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
                <p>
                Is this group private or public?
                </p>
                <select
                value={publicOrPrivate}
                onChange={(e) => {
                    setPublicOrPrivate(e.target.value)
                }}
                >
                    <option>Public</option>
                    <option>Private</option>
                </select>
                <button
                onSubmit={(e) => handleSumbit}
                >Create group</button>
            </form>
        </>
    )
}
