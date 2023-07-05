import {NavLink} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from '../../store/session'

export default function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </>

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
        <button
        onClick={() => {dispatch(sessionActions.login({ credential: 'john1@doe.com', password: 'password' }))}}
        >Demo-User</button>
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
