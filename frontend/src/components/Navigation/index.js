import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

export default function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      );
    } else {
      sessionLinks = (
        <li>
          <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
          <OpenModalButton
          buttonText="Sign up"
          modalComponent={<SignupFormModal />}
        />
        </li>
      );
    }

    return (
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    );
  }
