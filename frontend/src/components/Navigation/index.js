import {NavLink, Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './index.css'

export default function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    //const dispatch = useDispatch()

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
          <li>
            <Link to='/groups/new'>Start a new group</Link>
          </li>
        </>

      );
    } else {
      sessionLinks = (
        <div id='login-signup'>
          <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
          <OpenModalButton
          buttonText="Sign up"
          modalComponent={<SignupFormModal />}
        />
        </div>
      );
    }

    return (
      <div id='nav'>
        <li id= 'home'>
          <NavLink exact to="/">Home</NavLink>
        </li>
          {isLoaded && sessionLinks}

      </div>
    );
  }
