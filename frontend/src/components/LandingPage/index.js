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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div>
                        <img id='landing-main' src='/images/landing-main.png' alt='placeholder'></img>
                    </div>
                </div>
                <div id='how-legup-works'>
                    <h1>How Run Up works</h1>
                    <p>    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div id='landing-cards'>
                    <div className='link-cards' onClick={() => history.push('/groups/1/10')}>
                        <img src='/images/groups.png' alt='view groups' />
                        <a
                            className='link'
                            href='/groups/1/10'>See all groups</a>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    <div className='link-cards' onClick={() => history.push('/events/1/10')}>
                        <img src='/images/events.png' alt='view events' />
                        <a
                            className='link'
                            href='/events/1/10'>Find an event</a>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    <div
                    className={user ? 'link-cards' : 'disabled-card'}
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
