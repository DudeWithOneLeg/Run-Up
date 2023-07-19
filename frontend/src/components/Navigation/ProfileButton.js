import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, Link } from "react-router-dom";
import './profileButton.css'

export default function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return
    const closeMenu = (e) => {
        console.log("CLOSE MENU")
        setShowMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
  }, [showMenu])

  const openMenu = () => {
    console.log("OPEN MENU")
    if (showMenu) return;
    setShowMenu(true);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown"  + (showMenu ? "" : " hidden");

  return (
    <>
      <img id='profile-img' src={'/images/profile-icon.png'} onClick={openMenu} />
      {showMenu && <>

      <div className={ulClassName}>
        <p className="profile-info">Hello, {user.firstName}</p>
        <a className="profile-info" href='/groups/1/10'>View groups</a>
        <a className="profile-info" href='/events/1/10'>View events</a>
        <p className="profile-info">{ showMenu && user.username}</p>
        <p className="profile-info">{showMenu && user.firstName} {showMenu && user.lastName}</p>
        <p className="profile-info">{showMenu && user.email}</p>
        <div id='logout-div'>
          <a onClick={logout}>Log Out</a>
        </div>

      </div>
      </>}

    </>
  );
}
