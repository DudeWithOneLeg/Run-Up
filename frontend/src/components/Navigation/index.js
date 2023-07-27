import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfileButton from './ProfileButton';
import OpenModalText from "../OpenModalText";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './index.css'

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  //const dispatch = useDispatch()

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div id='profile-new-group'>
        <div id='start-new-group'>
          <Link to='/groups/new'>Start a new group</Link>
        </div>

        <ProfileButton user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <div id='login-signup'>
        <OpenModalText
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalText
          id='login'
          buttonText="Sign up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  return (
    <div id='nav'>

      <NavLink id='home' exact to="/">Run Up</NavLink>
      <div id='socials'>
        <a href='https://github.com/DudeWithOneLeg' target="_blank"> <img id='github' src='/images/github-mark.png' alt='github' /></a>
        <a href='https://www.linkedin.com/in/romeo-galvan-9418b6225/' target="_blank"> <img id='linkedin' src='/images/linkedin.png' alt='linkedin' /></a>
      </div>


      {isLoaded && sessionLinks}

    </div>
  );
}
