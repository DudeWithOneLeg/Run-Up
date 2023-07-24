import './index.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import OpenModalText from "../OpenModalText";
import SignupFormModal from "../SignupFormModal";
export default function LandingPage() {
    const history = useHistory()

    window.addEventListener('mousemove', (event) => {

    });
    const user = useSelector(state => state.session.user)

    return (
        <div id='landing-div'>
            <div id='landing-outer-div'>
                <div id='landing-inner-div'>
                    <div id='landing-about-div'>
                        <h1>
                            The people platform—
                            Where interests
                            become friendships
                        </h1>
                        <p>
                            StrideTogether: Where Runners Unite! Lace up your running shoes and join our vibrant online community dedicated to bringing runners from all walks of life together. Whether you're a seasoned athlete or a novice jogger, StrideTogether offers a supportive and motivating space to connect with like-minded individuals who share your passion for running.
                        </p>
                    </div>
                    <div>
                        <img id='landing-main' src='/images/landing-main.png' alt='placeholder'></img>
                    </div>
                </div>
                <div id='how-legup-works'>
                    <h1>How Run Up works</h1>
                    <p>Run Up is an interactive website designed to facilitate the formation of running groups and the organization of exciting events, bringing together runners of all levels to share their passion, train collectively, and conquer new milestones.
                    </p>
                </div>

                <div id='landing-cards'>
                    <div className='link-cards' onClick={() => history.push('/groups/1/10')}>
                        <img src='/images/groups.png' alt='view groups' />
                        <a
                            className='link'
                            href='/groups/1/10'>See all groups</a>
                        <p>
                            Discover your tribe, lace up, and conquer the roads together! 🏃‍♂️🏃‍♀️ Join the community of passionate runners, united by their love for the sport and camaraderie.
                        </p>
                    </div>
                    <div className='link-cards' onClick={() => history.push('/events/1/10')}>
                        <img src='/images/events.png' alt='view events' />
                        <a
                            className='link'
                            href='/events/1/10'>Find an event</a>
                        <p>
                            Explore the latest events, set your sights on new challenges, and let the adrenaline-fueled adventures begin!
                        </p>
                    </div>
                    <div
                        className={user ? 'link-cards' : 'disabled-card link-cards'}
                        onClick={(e) => {
                            if (!user) {
                                return e.preventDefault()
                            }
                            return history.push('/groups/new')
                        }}
                    >
                        <img src='/images/create-group.png' alt='create a group' />
                        <a
                            className={user ? 'link' : 'disabled-link'}
                            onClick={(e) => {
                                if (!user) {
                                    e.preventDefault()
                                }
                            }}
                            href='/groups/new'>Start a new group</a>
                        <p>
                        Start your own running group on our platform, gather fellow enthusiasts, and create a community that runs together and supports each other.
                        </p>
                    </div>

                </div>
                {!user && <div id='join'>
                    <OpenModalText
                        buttonText="Join Run Up"
                        modalComponent={<SignupFormModal />}
                    />
                </div>}
            </div>

        </div>

    )
}
